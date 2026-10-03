import React from 'react';
import { connect } from 'react-redux';
import { getSelectedLocationAndLength } from '../ducks/mission';
import { getExpeditionLengthGuidance, getLocationGuidance } from '../data/missionGuidance';

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderHero(hero) {
  return <article className="recommended-hero" key={hero.name}>
    <a className="recommended-hero-image" href={hero.imageSource} target="_blank" rel="noreferrer" aria-label={`View ${hero.name}'s portrait source on the official wiki`}>
      <img src={hero.image} alt={hero.name} loading="lazy" />
    </a>
    <div className="recommended-hero-copy">
      <h3><a href={hero.wikiPage} target="_blank" rel="noreferrer">{hero.name}</a></h3>
      {hero.recommendationType === 'synergy' && <span className="recommendation-badge">Zone synergy</span>}
      <p>{hero.reason}</p>
    </div>
  </article>;
}

export function MissionGuidance({ selectedLocation, selectedLength }) {
  const location = getLocationGuidance(selectedLocation);
  const expedition = getExpeditionLengthGuidance(selectedLength);

  if (!location || !expedition) {
    return null;
  }

  return <section className="mission-guidance">
    <h1 className="centered">Expedition Guide</h1>
    <div className="guidance-grid">
      <section className="hero-guidance">
        <h2>Useful Heroes — {titleCase(selectedLocation)}</h2>
        <div className="recommended-heroes">
          {location.heroes.map(renderHero)}
        </div>
        <ul className="guidance-notes">
          {location.notes.map(note => <li key={note}>{note}</li>)}
        </ul>
      </section>

      <section className="length-guidance">
        <h2>{titleCase(selectedLength)} Expedition</h2>
        <div className="camp-count">
          <span className="camp-count-number">{expedition.campCount}</span>
          <span>{expedition.campCount === 1 ? 'camp' : 'camps'}</span>
        </div>
        <p className="length-summary">{expedition.summary}</p>
        <ul className="guidance-notes">
          {expedition.tips.map(tip => <li key={tip}>{tip}</li>)}
        </ul>
      </section>
    </div>
  </section>;
}

export default connect(getSelectedLocationAndLength)(MissionGuidance);
