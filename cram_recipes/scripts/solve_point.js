const fs = require('fs');
const f_raw_point_table = fs.readFileSync('../raw/point_table', 'utf8');

let raw_point_table = f_raw_point_table
    .replace(/<a href.+\">/g, '<a>')
    .replace(/<td colspan.+>/g, '')
    .replace(/\n<\/td>/g, '<\/td>')

    .replace(/<img alt.+ data-url/g, '<data-url')
    .replace(/<td><a><data-url/g, '<img-url')
    .replace(/png\" \/><\/a><\/td>/g, 'png\"></img-url>')

    .replace(/<td rowspan.+image\"><a>/g, '<type>')
    .replace(/<\/a><\/span><\/span><link.+\/><\/td>/g, '</type>');

let raw_point_lines = raw_point_table.split('\n');

let point_buf = '{';
let skip = true;
for (let line of raw_point_lines) {
  if (line.match(/type/)) {
    let [type] = line.match(/[^type<>]+/);
    if (skip) {
      point_buf += `\"${type}\": [`;
      skip = false;
    } else {
      point_buf += `], \"${type}\": [`;
    }
  } else if (line.match(/img-url/)) {
    point_buf += line.replace("<img-url=", "{\"img_url\": ").replace("><\/img-url>", ",");
  } else if (line.match(/<td><a>\D+<\/a><\/td>/)) {
    let [name] = line.match(/[^atd<>]+/);
    point_buf += `"name": "${name}",`;
  } else if (line.match(/<td>\d+<\/td>/)) {
    let [point] = line.match(/\d+/);
    point_buf += `"point": ${point}},`;
  } else if (line.match(/<\/td><\/tr>/)) {
  } else if (line.match(/<tr>/)) {
  } else {
    point_buf += line;
  }
  point_buf += '\n';
}
point_buf += ']}';

console.log(point_buf);
