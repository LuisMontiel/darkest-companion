import React from 'react';
import { connect } from 'react-redux';
import { getSelectedLocation } from '../ducks/mission';
import { getCuriosForLocation } from '../data/curios';
import { getProvisionWikiUrl } from '../data/provisionLinks';

const curiosWikiUrl = 'https://darkestdungeon.wiki.gg/wiki/Curios';
const curioWikiAnchors = {
  'Heirloom Chest': 'Heirloom_Chest_(1)',
  'Stack of books': 'Stack_of_Books',
  'Makeshift dining table': 'Makeshift_Dining_Table',
  'Sacrifial Stone': 'Sacrificial_Stone',
  'Brackish Tidepool': 'Brackish_Tide_Pool',
};

function getCurioWikiUrl(name) {
  const anchor = curioWikiAnchors[name] || name.replace(/\s+/g, '_');
  return `${curiosWikiUrl}#${encodeURIComponent(anchor)}`;
}

function renderOutcome(outcome, index) {
  let amount;
  let chances;
  if (outcome.amount) {
    amount = <span className='curio-outcome-amount'>&nbsp;x{outcome.amount}</span>
  }

  if (outcome.chances !== 100) {
    chances = <span className='curio-outcome-chances'>{outcome.chances}%</span>
  }


  return <div className='curio-outcome' key={`curio-outcome-${index}`}>
    {chances}
    <span className='curio-outcome-label'>{outcome.type.label}</span>
    {amount}
  </div>
}

function renderCurioOption(option, index) {
  const provisionWikiUrl = getProvisionWikiUrl(option.activator.label);
  const activatorIcon = <img className="curio-activator" src={option.activator.icon} alt={option.activator.label}/>;

  return <div className="curio-cell curio-option" key={`curio-option-${index}`}>
    <div className="curio-cell-container">
      <div className="curio-cell-item">
        {provisionWikiUrl
          ? <a className='curio-activator-link' href={provisionWikiUrl} target='_blank' rel='noreferrer' aria-label={`Open ${option.activator.label} on the official wiki`}>
              {activatorIcon}
            </a>
          : activatorIcon}
      </div>
      <div className="curio-cell-item">
        {option.outcomes.map(renderOutcome)}
      </div>
  </div>
  </div>
}

function renderCurio(curio, index) {

  let icon;

  if (curio.icon) {
    icon = <img className='curio-icon' src={curio.icon} alt={curio.label}/>
  }

  return <div className='curio' key={`curio-${index}`}>
    <div className='curio-cell curio-description'>
      <div className='curio-name'>
        <a href={getCurioWikiUrl(curio.name)} target='_blank' rel='noreferrer'>
          {curio.name}
        </a>
      </div>
      {icon}
      {/*<div  className='curio-description'>{curio.description}</div>*/}
    </div>
    {curio.options.map(renderCurioOption)}
  </div>
}

export function LocationCurios({selectedLocation}) {
  const curios = getCuriosForLocation(selectedLocation);

  return <section className="level-curios">
    <h1 className='centered'>Curios</h1>
    {curios.map(renderCurio)}
  </section>;
}

export default connect(getSelectedLocation)(LocationCurios);
