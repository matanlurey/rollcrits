import { DefenseStats, DefenseDie } from './simulation';
import { DefenderPresetKeys } from './config';

export interface Defender extends DefenseStats {
  name: string;
}

export const presets: { [key in DefenderPresetKeys]: Defender[] } = {
  // Not visible in the UI.
  debug: [
    {
      name: 'BX Droid Commandos (2x Shields)',
      dice: DefenseDie.red,
      shield: 2,
      pierce: 'impervious',
    },
  ],

  // Show-cases units of different strength and stats.
  standard: [
    { name: 'B1 Battle Droid', dice: DefenseDie.white },
    { name: 'B2 Super Battle Droid', dice: DefenseDie.white, armor: 1 },
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
  ],

  // Show-cases units with danger sense or other similar defensive buffs.
  'danger-sense': [
    {
      name: 'Rebel Troopers w/ Dodge',
      dice: DefenseDie.white,
      dodge: 1,
      surges: true,
    },
    {
      name: 'Rebel Pathfinders (DS1)',
      dice: DefenseDie.white,
      extraDice: 1,
      surges: true,
    },
    {
      name: 'Rebel Pathfinders (DS2)',
      dice: DefenseDie.white,
      extraDice: 2,
      surges: true,
    },
    {
      name: 'Rebel Pathfinders (DS3)',
      dice: DefenseDie.white,
      extraDice: 3,
      surges: true,
    },
    {
      name: 'Jyn Erso (DS4)',
      dice: DefenseDie.white,
      extraDice: 4,
      surges: true,
    },
    {
      name: 'Jyn Erso (DS4 + Dodge)',
      dice: DefenseDie.white,
      extraDice: 4,
      dodge: 1,
      surges: true,
    },
    {
      name: 'BX Droid Commandos (2x Shields)',
      dice: DefenseDie.red,
      shield: 2,
      pierce: 'impervious',
    },
    {
      name: 'STAPs w/ Dodge',
      dice: DefenseDie.white,
      dodge: 1,
    },
    {
      name: 'Tauntaun Riders w/ 2x Dodge',
      dice: DefenseDie.white,
      dodge: 2,
      surges: true,
    },
    {
      name: 'Droidekas (4x Shields)',
      dice: DefenseDie.white,
      surges: true,
      shield: 4,
    },
    {
      name: 'Iden Versio w/ Dodge+Shield',
      dice: DefenseDie.red,
      dodge: 1,
      shield: 1,
    },
    {
      name: 'Sabine w/ Dodge',
      dice: DefenseDie.red,
      surges: true,
      dodge: 1,
      pierce: 'impervious',
    },
    {
      name: 'Sabine (Darksaber Melee) w/ Dodge',
      dice: DefenseDie.red,
      surges: true,
      dodge: 1,
      pierce: 'immune',
    },
    {
      name: 'Saber Tank w/ Dodge',
      dice: DefenseDie.red,
      armor: true,
      dodge: {
        outmanuever: true,
        tokens: 1,
      },
    },
  ],

  jedi: [
    {
      name: 'Luke Skywalker',
      dice: DefenseDie.red,
      pierce: 'immune',
    },
    {
      name: 'Luke Skywalker w/ Dodge',
      dice: DefenseDie.red,
      dodge: {
        deflect: true,
        tokens: 1,
      },
      pierce: 'immune',
    },
    {
      name: 'Luke Skywalker (Jedi) w/ Full of Surprises',
      dice: DefenseDie.red,
      extraDice: {
        white: 4,
        red: 0,
      },
      dodge: {
        deflect: true,
        tokens: 1,
      },
      pierce: 'immune',
    },
    {
      name: 'Emperor Palpatine',
      dice: DefenseDie.red,
      surges: true,
      pierce: 'immune',
    },
    {
      name: 'Emperor Palpatine (Guardian 2)',
      dice: DefenseDie.red,
      surges: true,
      guardian: 2,
      pierce: 'immune',
    },
    {
      name: 'General Grievous',
      dice: DefenseDie.red,
      pierce: 'impervious',
    },
    {
      name: 'General Grievous (Guardian 4)',
      dice: DefenseDie.red,
      pierce: 'impervious',
      guardian: 4,
    },
  ],

  // Show-cases units that can take advantage of aggressive tactics.
  'aggressive-tactics': [
    {
      name: 'B1 Battle Droid',
      dice: DefenseDie.white,
    },
    {
      name: 'B1 Battle Droid w/ Surge',
      dice: DefenseDie.white,
      surges: 1,
    },
    {
      name: 'B2 Super Battle Droid',
      dice: DefenseDie.white,
      armor: 1,
    },
    {
      name: 'B2 Super Battle Droid w/ Surge',
      dice: DefenseDie.white,
      surges: 1,
      armor: 1,
    },
    {
      name: 'Shoretroopers',
      dice: DefenseDie.red,
    },
    {
      name: 'Shoretroopers w/ Surge',
      dice: DefenseDie.red,
      surges: 1,
    },
    {
      name: 'ARC Troopers w/ 1 Surge',
      dice: DefenseDie.red,
      surges: 1,
      pierce: 'impervious',
    },
    {
      name: 'ARC Troopers w/ 2 Surge',
      dice: DefenseDie.red,
      surges: 2,
      pierce: 'impervious',
    },
    {
      name: 'Darth Vader w/ 1 Surge',
      dice: DefenseDie.red,
      surges: 1,
      pierce: 'immune',
    },
    {
      name: 'Darth Vader w/ 2 Surge',
      dice: DefenseDie.red,
      surges: 2,
      pierce: 'immune',
    },
    {
      name: 'Occupier Tank',
      dice: DefenseDie.red,
      armor: true,
    },
    {
      name: 'Occupier Tank w/ 1 Surge',
      dice: DefenseDie.red,
      armor: true,
      surges: 1,
    },
  ],

  // Show-cases a list with a significant amount of defensive buffs.
  'rex-star': [
    {
      name: 'Phase IIs',
      dice: DefenseDie.red,
    },
    {
      name: 'Phase IIs w/ 1 Surge',
      dice: DefenseDie.red,
      surges: 1,
    },
    {
      name: 'Phase IIs w/ 1 Surge + Dodge',
      dice: DefenseDie.red,
      surges: 1,
      dodge: 1,
    },
    {
      name: 'Phase IIs w/ 2 Surge + Dodge',
      dice: DefenseDie.red,
      surges: 2,
      dodge: 1,
    },
    {
      name: 'Phase IIs w/ 4 Surge + 2 Dodge',
      dice: DefenseDie.red,
      surges: 4,
      dodge: 2,
    },
  ],
};
