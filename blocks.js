var Blocks = new Array(); //[BlockID][color, structure](iff structure)[x, y][x1, x2, x3, x4]

Blocks[0] = new Array(); //I
Blocks[0][0] = '#00FFFF';
Blocks[0][1] = new Array();
Blocks[0][1][0] = new Array(0, 0, 0, 0);
Blocks[0][1][1] = new Array(-2, -1, 0, 1);

Blocks[1] = new Array(); //J
Blocks[1][0] = '#0000FF';
Blocks[1][1] = new Array();
Blocks[1][1][0] = new Array(0, 0, 0, -1);
Blocks[1][1][1] = new Array(-1, 0, 1, 1);

Blocks[2] = new Array(); //L
Blocks[2][0] = '#FF8000';
Blocks[2][1] = new Array();
Blocks[2][1][0] = new Array(0, 0, 0, 1);
Blocks[2][1][1] = new Array(-1, 0, 1, 1);

Blocks[3] = new Array(); //O
Blocks[3][0] = '#FFFF00';
Blocks[3][1] = new Array();
Blocks[3][1][0] = new Array(0, 0, 1, 1);
Blocks[3][1][1] = new Array(0, 1, 0, 1);

Blocks[4] = new Array(); //S
Blocks[4][0] = '#BFFF00';
Blocks[4][1] = new Array();
Blocks[4][1][0] = new Array(1, 0, 0, -1);
Blocks[4][1][1] = new Array(0, 0, 1, 1);

Blocks[5] = new Array(); //T
Blocks[5][0] = '#800080';
Blocks[5][1] = new Array();
Blocks[5][1][0] = new Array(0, -1, 0, 1);
Blocks[5][1][1] = new Array(1, 0, 0, 0);

Blocks[6] = new Array(); //Z
Blocks[6][0] = '#FF0000';
Blocks[6][1] = new Array();
Blocks[6][1][0] = new Array(-1, 0, 0, 1);
Blocks[6][1][1] = new Array(0, 0, 1, 1);