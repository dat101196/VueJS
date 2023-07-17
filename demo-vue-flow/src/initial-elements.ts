export const initialElements = [
  { id: '1', label: 'Node 1', position: { x: 0, y: 0 } },
  { id: '2', label: 'Node 2', position: { x: 400, y: 400 } },
  { id: '3', label: 'Node 3', position: { x: 400, y: 0 } },
  { id: '4', label: 'Node 4', position: { x: 0, y: 400 } },
  { id: '5', style: { borderColor: 'red' }, label: 'Drag me over another node', position: { x: 200, y: 200 } },
]
//Test dùng list nodes và list edges để khởi tạo elements
// export const initialElements = [
//   {
//     "type": "input",
//     "data": {},
//     "events": {},
//     "id": "1",
//     "label": "Node 1",
//     "position": {
//       "x": 250,
//       "y": 0
//     },
//     "class": "light"
//   },
//   {
//     "type": "output",
//     "data": {},
//     "events": {},
//     "id": "2",
//     "label": "Node 2",
//     "position": {
//       "x": 100,
//       "y": 100
//     },
//     "class": "light"
//   },
//   {
//     "type": "default",
//     "data": {},
//     "events": {},
//     "id": "3",
//     "label": "Node 3",
//     "position": {
//       "x": 400,
//       "y": 100
//     },
//     "class": "light"
//   },
//   {
//     "type": "default",
//     "data": {},
//     "events": {},
//     "id": "4",
//     "label": "Node 4",
//     "position": {
//       "x": 150,
//       "y": 200
//     },
//     "class": "light"
//   },
//   {
//     "type": "output",
//     "data": {},
//     "events": {},
//     "id": "5",
//     "label": "Node 5",
//     "position": {
//       "x": 300,
//       "y": 300
//     },
//     "class": "light"
//   },
//   {
//     "type": "default",
//     "source": "1",
//     "target": "2",
//     "data": {},
//     "events": {},
//     "id": "e1-2",
//     "animated": true,
//     "sourceX": 325,
//     "sourceY": 39,
//     "targetX": 175,
//     "targetY": 97
//   },
//   {
//     "type": "default",
//     "source": "1",
//     "target": "3",
//     "data": {},
//     "events": {},
//     "label": "edge with arrowhead",
//     "id": "e1-3",
//     "markerEnd": "arrowclosed",
//     "sourceX": 325,
//     "sourceY": 39,
//     "targetX": 475,
//     "targetY": 97
//   },
//   {
//     "type": "step",
//     "source": "4",
//     "target": "5",
//     "data": {},
//     "events": {},
//     "label": "step-edge",
//     "id": "e4-5",
//     "style": {
//       "stroke": "orange"
//     },
//     "labelBgStyle": {
//       "fill": "orange"
//     },
//     "sourceX": 225,
//     "sourceY": 239,
//     "targetX": 375,
//     "targetY": 297
//   },
//   {
//     "type": "smoothstep",
//     "source": "3",
//     "target": "4",
//     "data": {},
//     "events": {},
//     "label": "smoothstep-edge",
//     "id": "e3-4",
//     "sourceX": 475,
//     "sourceY": 139,
//     "targetX": 225,
//     "targetY": 197
//   }
// ]