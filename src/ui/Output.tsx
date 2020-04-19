import React from "react";
import Prando from "prando";
import { Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as stats from "simple-statistics";
import { AttackDiceConfig } from "../state/State";

enum AttackDiceSide {
  blank,
  surge,
  hit,
  crit,
}

class DiceRng {
  private static readonly table = {
    white: [
      AttackDiceSide.crit,
      AttackDiceSide.surge,
      AttackDiceSide.hit,
      AttackDiceSide.blank,
      AttackDiceSide.blank,
      AttackDiceSide.blank,
      AttackDiceSide.blank,
      AttackDiceSide.blank,
    ],

    black: [
      AttackDiceSide.crit,
      AttackDiceSide.surge,
      AttackDiceSide.hit,
      AttackDiceSide.hit,
      AttackDiceSide.hit,
      AttackDiceSide.blank,
      AttackDiceSide.blank,
      AttackDiceSide.blank,
    ],

    red: [
      AttackDiceSide.crit,
      AttackDiceSide.surge,
      AttackDiceSide.hit,
      AttackDiceSide.hit,
      AttackDiceSide.hit,
      AttackDiceSide.hit,
      AttackDiceSide.hit,
      AttackDiceSide.blank,
    ],
  };

  constructor(private readonly rng: Prando = new Prando()) {}

  white(): AttackDiceSide {
    return this.rng.nextArrayItem(DiceRng.table.white);
  }

  black(): AttackDiceSide {
    return this.rng.nextArrayItem(DiceRng.table.black);
  }

  red(): AttackDiceSide {
    return this.rng.nextArrayItem(DiceRng.table.red);
  }
}

export default (props: { dice: AttackDiceConfig; iterations: number }) => {
  const data: number[] = [];
  const rng = new DiceRng();
  for (let i = 0; i < props.iterations; i++) {
    let hits = 0;
    const incrementIfHit = (side: AttackDiceSide) => {
      if (side !== AttackDiceSide.blank && side !== AttackDiceSide.surge) {
        hits++;
      }
    };
    for (let w = 0; w < props.dice.white; w++) {
      incrementIfHit(rng.white());
    }
    for (let b = 0; b < props.dice.black; b++) {
      incrementIfHit(rng.black());
    }
    for (let r = 0; r < props.dice.red; r++) {
      incrementIfHit(rng.red());
    }
    data.push(hits);
  }
  return (
    <>
      <Table
        bordered
        columns={[
          { title: "Type", dataIndex: "type", width: 30, key: "type" },
          { title: "Hits", dataIndex: "hits", width: 30, key: "hits" },
          {
            title: (
              <>
                <QuestionCircleOutlined />
                &nbsp;Details
              </>
            ),
            dataIndex: "details",
            key: "Details",
          },
        ]}
        dataSource={[
          {
            key: "Mean",
            type: "Mean",
            hits: stats.mean(data).toFixed(2),
            details: (
              <>
                Known as the <em>average</em>, or the sum of all values over the
                number of all values.
              </>
            ),
          },
          {
            key: "Mode",
            type: "Mode",
            hits: stats.mode(data).toFixed(2),
            details: (
              <>
                The{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Mode_(statistics)"
                  rel="_blank"
                  title="Learn more about the mode in statistics"
                >
                  mode
                </a>{" "}
                is the most <em>commonly</em> seen result in the simulation.
              </>
            ),
          },
          {
            key: "Median",
            type: "Median",
            hits: stats.median(data).toFixed(2),
            details: (
              <>
                The{" "}
                <a
                  href="http://en.wikipedia.org/wiki/Median"
                  rel="_blank"
                  title="Learn more about the median in statistics"
                >
                  median
                </a>{" "}
                is the middle number - useful when outliners skew the mean.
              </>
            ),
          },
          {
            key: "P50",
            type: "P50",
            hits: stats.quantile(data, 1 - 0.5).toFixed(2),
            details: <>50% of results will exceed this estimate.</>,
          },
          {
            key: "P90",
            type: "P90",
            hits: stats.quantile(data, 1 - 0.9).toFixed(2),
            details: <>90% of results will exceed this estimate.</>,
          },
        ]}
      />
    </>
  );
};
