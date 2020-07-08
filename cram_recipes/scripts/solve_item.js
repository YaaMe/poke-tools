const fs = require('fs');

const f_raw_item_table = fs.readFileSync('../raw/item_table', 'utf8');
const trans_type = require('../data/trans_type.js');
let trans_map = {};
Object.keys(trans_type).forEach(key => {
  trans_map[trans_type[key]] = key;
});

const point_map = [
  [1, 20],
  [21, 30],
  [31, 40],
  [41, 50],
  [51, 60],
  [61, 70],
  [71, 80],
  [81, 90],
  [91, 100],
  [101, 110],
  [111, 120],
  [121, 130],
  [131, 140],
];


let raw_item_table = f_raw_item_table
    .replace(/<td class=\"bg-/g, '<type>')
    .replace(/\"><span.+\/><\/td>/g, '</type>')
    .replace(/\"><span.+<\/style><\/td>/, '</type>')

let raw_item_lines = raw_item_table.split('\n');

let item_buf = '';

for (let line of raw_item_lines) {
  if (line.match(/type/)) {
    item_buf += line;
  } else if(line.match(/td/)) {
    if (line.match(/道具/)) {
      // item
      let target = line.split("<br />");
      switch (target.length) {
        case 2:
          item_buf += "<item>\n";
          line = line.replace(/<img alt.+ data-url=/g, '\nimg_url: ').replace(/\/>/, '');
          let [img_url, item_name] = line.split("<br />");
          img_url = img_url.split('\n')[1].replace(/<\/a>/, '');
          item_buf += img_url + '\n';
          item_name = item_name.split('>')[1].replace(/<\/a/, '');
          item_buf += `item_name: ${item_name}\n`;
          item_buf += `prop: item`;
          item_buf += "\n</item>";
          break;
        default:
          item_buf += "<items>\n";
          let items = line.split("<br />");
          let pack_item = [];
          if (items.length % 2 != 0) throw Error("items pack won't be right");
          items = items.reduce((prev, now, i) => {
            if (i == 1) {
              return [[prev, now]];
            }
            if (i % 2 == 0) {
              return [...prev, now];
            }
            let last = prev.pop();
            return [...prev, [last, now]];
          });
          items.forEach(([img_url, item_name]) => {
            item_buf += "<item>\n";
            img_url = img_url.split("=").pop().replace(/\/><\/a>/, '');
            item_buf += `img_url: ${img_url}\n`;
            item_name = item_name.split('>')[1].replace(/<\/a/, '');
            item_buf += `item_name: ${item_name}\n`;
            item_buf += `prop: item`;
            item_buf += "\n</item>\n";
          });
          item_buf += "\n</items>";
          ;
      }

    } else if (line.match(/招式/)) {
      // TR
      item_buf += "<move>\n";
      line = line.replace(/<img alt.+ data-url=/g, '\nimg_url: ').replace(/\/>/, '');
      let [img_url, tr_no, tr_name] = line.split("<br />");
      img_url = img_url.split('\n')[1].replace(/<\/a>/, '');
      item_buf += img_url + '\n';
      tr_no = tr_no.split('>')[1].replace(/<\/a/, '');
      item_buf += `tr_no: ${tr_no}\n`;
      tr_name = tr_name.split('>')[1].replace(/<\/a/, '');
      item_buf += `tr_name: ${tr_name}\n`;
      item_buf += `prop: tr`;
      item_buf += "\n</move>";
    }
  } else {
    item_buf += line;
  }
  item_buf += '\n';
}

item_buf = item_buf.replace(/<tr>/g, '').replace(/\n\n/g, '\n').replace();
let item_table = {};
let type_now = "";
let prop = "";
let packing = false;
let info = [];
let pack = [];
item_buf.split("\n").forEach(line => {
  if (line.match(/<type>/)) {
    let type_ch = line.split('<')[1].split('>')[1];
    type_now = trans_map[type_ch];
  } else if(line.match(/\/items/)) {
    if (!item_table[type_now]) item_table[type_now] = [];
    item_table[type_now].push(info);
    packing = false;
    info = [];
    prop = "";
  } else if (line.match(/\<\/.+>/)) {
    if (!packing) {
      if (!item_table[type_now]) item_table[type_now] = [];
      item_table[type_now].push(info);
      prop = "";
      info = [];
    } else {
      info.push(pack);
      pack = [];
    }
  } else if (line.match(/<move>/)) {
    prop = "move";
  } else if (line.match(/<item>/)) {
    prop = "item";
  } else if (line.match(/<items>/)) {
    prop = "items";
    packing = true;
  } else {
    if (!packing) {
      info.push(line);
    } else {
      pack.push(line);
    }
  }
});

const unzip_item = (item, hit_range) => {
  if (item[0].length == 0) item = item.slice(1);
  let pack = { hit_range };
  item.forEach(info => {
    let [key, value] = info.split(":");
    pack[key] = value.replace(/ /g, '').replace(/\"/g, '');
  });
  return pack;
};
let table = {};
Object.keys(item_table).forEach((key) => {
  table[key] = item_table[key].map((item, i) => {
    if (Array.isArray(item[0])) {
      return item.map(x => unzip_item(x, point_map[i]));
    } else {
      return unzip_item(item, point_map[i]);
    }
  });
});


console.log(JSON.stringify(table, null, 2));
