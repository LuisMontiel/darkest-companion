import React from 'react';
import LocationSelector from './locationSelector';
import LengthSelector from './lengthSelector';
import MissionProvisions from './missionProvisions';
import LocationCurios from './locationCurios';
import LocationTips from './locationTips';
import MissionGuidance from './missionGuidance';

export default function App() {
  return <div className='app'>
    <div className='mission-layout'>
      <div className='mission-controls'>
        <LocationSelector/>
        <LengthSelector/>
        <MissionProvisions/>
      </div>
      <LocationTips/>
      <MissionGuidance/>
      <LocationCurios/>
    </div>
    <div className='copyrights'>
      Game content, images and materials are trademarks and copyrights of <a href='http://www.darkestdungeon.com/the-team/'>Red Hook Studios</a>, creators of the (awesome) <a href='http://www.darkestdungeon.com/'>Darkest Dungeon</a> game.
    </div>
  </div>;
}
