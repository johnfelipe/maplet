var bubu ={ s64:"699",s65:"1109",s11:"596",s12:"392",s13:"3665",s14:"1281",s15:"1872",s21:"1690",s22:"1270",s23:"1718",s31:"790",s32:"5982",s33:"4322",s34:"7647",s35:"3200",s36:"2930",s37:"7206",s41:"6456",s42:"4635",s43:"3378",s44:"4023",s45:"2341",s46:"596",s50:"2188",s51:"8328",s52:"5146",s53:"5744",s54:"965",s61:"2830",s62:"4405",s63:"840" };
var title = "2006年教育程度-未上过学";
var unit = "人";
function getColor(d) {
    return d > 7000 ? '#800026' :
           d > 5200  ? '#BD0026' :
           d > 4100  ? '#E31A1C' :
           d > 3000  ? '#FC4E2A' :
           d > 1800   ? '#FD8D3C' :
           d > 1100  ? '#FEB24C' :
           d > 700   ? '#FED976' :
           d > 390   ? '#FFEDA0' :
           d < 0   ? '#000000' :
                      '#000000';
}
var vgrades = [390, 700, 1100, 1800, 3000, 4100, 5200, 7000];