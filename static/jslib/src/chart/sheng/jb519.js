var bubu ={ s64:"41336.46",s65:"77183.63",s11:"140812.88",s12:"59647.38",s13:"244988.51",s14:"105875.05",s15:"73154.74",s21:"217154.68",s22:"109714.74",s23:"110508.16",s31:"230517.53",s32:"522329.29",s33:"365017.13",s34:"179701.21",s35:"246012.63",s36:"147080.54",s37:"386731.08",s41:"333980.16",s42:"265756.75",s43:"260278.41",s44:"687429.19",s45:"305507.09",s46:"37517.74",s50:"147068.75",s51:"262708.65",s52:"59159.17",s53:"87590.64",s54:"3455.23",s61:"111218.74",s62:"49270.16",s63:"22170.93" };
var title = "2009年各地区废水排放总量";
var unit = "万吨";
function getColor(d) {
    return d > 380000 ? '#800026' :
           d > 300000  ? '#BD0026' :
           d > 240000  ? '#E31A1C' :
           d > 150000  ? '#FC4E2A' :
           d > 110000   ? '#FD8D3C' :
           d > 74000  ? '#FEB24C' :
           d > 42000   ? '#FED976' :
           d > 3400   ? '#FFEDA0' :
           d < 0   ? '#000000' :
                      '#000000';
}
var vgrades = [3400, 42000, 74000, 110000, 150000, 240000, 300000, 380000];