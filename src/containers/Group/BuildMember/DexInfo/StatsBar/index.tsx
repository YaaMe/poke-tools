import React from 'react';
import './statsbar.scoped.scss';

const getStatsBarStyle = (base) => {
    let width = base * 180 / 540;
    width = width > 179 ? 179 : Math.floor(width);
    let color = base * 180 / 540;
    color = color > 360 ? 360 : Math.floor(color);
    let style = {
        width: `${width}px`,
        background: `hsl(${color}, 85%, 45%)`,
        borderColor: `hsl(${color}, 85%, 45%)`,
    }

    return base < 50 ? {'text-align': 'right', color: 'black', ...style} : style
}

const StatsBar = ({title, base, ev, effect = []}) => {
  let [plus, minus] = effect;
  return (
    <div className="bar">
      <label>{title}</label>
      <bar style={getStatsBarStyle(base)}>
          <span style={{position: base < 50 ? "absolute": "unset", paddingLeft: base < 50 ? '4px' : 0}}>{base}</span>
      </bar>
      <em>
        {ev}
        {plus && <effect>+</effect>}
        {minus && <effect>-</effect>}
      </em>
    </div>
  )
};

export default StatsBar;
