import React from 'react';
import { Table, Row, Col, Tag } from 'antd';
import Media from 'react-media';

import './Breakdown.scss';

import * as stats from 'simple-statistics';
import { AttackBranch, DefenseDie, DefenseStats } from '../../app/simulation';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';
import { CaretDownOutlined } from '@ant-design/icons';

interface Defender extends DefenseStats {
  name: string;
}

// TODO: Make customizable.
const defending: Defender[] = [
  // Sample units.
  { name: 'B1 Battle Droid', dice: DefenseDie.white },
  { name: 'B2 Battle Droid', dice: DefenseDie.white, armor: 1 },
  { name: 'Rebel Trooper', dice: DefenseDie.white, surges: true },
  { name: 'Stormtrooper', dice: DefenseDie.red },
  { name: 'Deathtrooper', dice: DefenseDie.red, surges: true },
  {
    name: 'Boba Fett',
    dice: DefenseDie.red,
    surges: true,
    pierce: 'impervious',
  },
  { name: 'Darth Vader', dice: DefenseDie.red, pierce: 'immune' },
  {
    name: 'Emperor Palpatine',
    dice: DefenseDie.red,
    pierce: 'immune',
    surges: true,
  },
  { name: 'Rebel AT-RT', dice: DefenseDie.white, armor: true },
  {
    name: 'X-34 Landpseeder',
    dice: DefenseDie.white,
    surges: true,
    armor: 2,
  },
  { name: 'AT-ST', dice: DefenseDie.white, surges: true, armor: true },
  { name: 'Dewback Rider', dice: DefenseDie.red, armor: 1 },
  { name: 'Occupier Tank', dice: DefenseDie.red, armor: true },
];

function compareStrings(a: string, b: string) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

function compareFloats(a: string, b: string) {
  return Number.parseFloat(a) - Number.parseFloat(b);
}

interface BreakdownProps {
  mods: {
    impact: number;
  };
  data: AttackBranch[];
}

interface BreakdownState {
  showUnitStats: boolean;
}

export default class extends React.Component<BreakdownProps, BreakdownState> {
  constructor(props: BreakdownProps) {
    super(props);
    this.state = {
      showUnitStats: true,
    };
  }

  render() {
    // Aggregate results per defending unit.
    const results: Array<{
      key: string;
      unit: Defender;
      cover0: string;
      cover1: string;
      cover2: string;
    }> = [];

    for (const defender of defending) {
      let woundsByCoverAmount: number[][] = [[], [], []];

      // For each amount of cover.
      for (let cover = 0; cover < woundsByCoverAmount.length; cover++) {
        // For each attacking dice pool.
        for (const branch of this.props.data) {
          // Add the number of expected wounds (v cover + defender).
          woundsByCoverAmount[cover].push(
            branch.hits(cover, defender).wounds(),
          );
        }
      }

      const expectedWounds = woundsByCoverAmount.map((w) =>
        stats.mean(w).toFixed(2),
      );

      results.push({
        key: defender.name,
        unit: defender,
        cover0: expectedWounds[0],
        cover1: expectedWounds[1],
        cover2: expectedWounds[2],
      });
    }

    // Add the expected hits independent of the defending unit.
    return (
      <Table bordered dataSource={results} pagination={false} size={'small'}>
        <Column
          title="Defending Unit"
          dataIndex="unit"
          key="unit"
          sorter={(a: Defender, b: Defender) => compareStrings(a.name, b.name)}
          render={(unit: Defender) => (
            <Row>
              <Col span={24}>{unit.name}</Col>
              {/* TODO: Use conditional rendering instead. */}
              <Media
                query="(min-width: 499px)"
                render={() => (
                  <Col span={24} hidden={!this.state.showUnitStats}>
                    {renderTags(unit)}
                  </Col>
                )}
              />
            </Row>
          )}
        />
        <ColumnGroup title="Cover">
          <Column
            title="0"
            dataIndex="cover0"
            key="cover0"
            sorter={(a: string, b: string) => compareFloats(a, b)}
          />
          <Column
            title="1"
            dataIndex="cover1"
            key="cover1"
            sorter={(a: string, b: string) => compareFloats(a, b)}
          />
          <Column
            title="2"
            dataIndex="cover2"
            key="cover2"
            sorter={(a: string, b: string) => compareFloats(a, b)}
          />
        </ColumnGroup>
      </Table>
    );
  }
}

function renderTags(defender: DefenseStats): React.ReactElement {
  const tags: React.ReactElement[] = [
    <Tag
      color={defender.dice === DefenseDie.red ? 'red' : 'default'}
      key="dice"
      style={{ transform: 'scale(0.5) rotate(45deg)' }}
    >
      &nbsp;
    </Tag>,
  ];
  if (defender.surges) {
    tags.push(
      <Tag
        color={defender.dice === DefenseDie.red ? 'red' : 'default'}
        key="surges"
      >
        Surge: <CaretDownOutlined /> {/* Infinity */}
      </Tag>,
    );
  }
  if (defender.pierce) {
    if (defender.pierce === 'impervious') {
      tags.push(
        <Tag color="volcano" key="pierce">
          <span>Impervious</span>
        </Tag>,
      );
    } else {
      tags.push(
        <Tag color="volcano" key="pierce">
          Immune: Pierce
        </Tag>,
      );
    }
  }
  if (defender.armor) {
    if (defender.armor === true) {
      tags.push(
        <Tag color="magenta" key="armor">
          Armor: <strong>&#8734;</strong>
        </Tag>,
      );
    } else {
      tags.push(
        <Tag color="magenta" key="armor">
          Armor: {defender.armor}
        </Tag>,
      );
    }
  }
  return <>{tags}</>;
}
