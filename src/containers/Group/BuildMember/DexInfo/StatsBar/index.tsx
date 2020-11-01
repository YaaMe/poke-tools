import React from 'react';
import './statsbar.scoped.scss';

const getStatsBarStyle = (ev) => {
  let width = ev * 180 / 540;
  width = width > 179 ? 179 : Math.floor(width);
  let color = ev * 180 / 540;
  color = color > 360 ? 360 : Math.floor(color);
  return {
    width: `${width}px`,
    background: `hsl(${color}, 85%, 45%)`,
    borderColor: `hsl(${color}, 85%, 45%)`,
  }
}

const StatsBar = ({title, ev, iv, effect = []}) => {
  let [plus, minus] = effect;
  return (
    <div className="bar">
      <label>{title}</label>
      <bar style={getStatsBarStyle(ev)}>{ev}</bar>
      <em>
        {iv}
        {plus && <effect>+</effect>}
        {minus && <effect>-</effect>}
      </em>
    </div>
  )
};

export default StatsBar;
