var bubu ={ s64:"3541",s65:"3029",s11:"11917",s12:"7279",s13:"3606",s14:"3705",s15:"4072",s21:"5039",s22:"4494",s23:"4360",s31:"12240",s32:"7147",s33:"8571",s34:"3683",s35:"6248",s36:"3560",s37:"5395",s41:"3528",s42:"4137",s43:"4154",s44:"5533",s45:"3424",s46:"3447",s50:"3413",s51:"3891",s52:"2741",s53:"3151",s54:"2318",s61:"3356",s62:"2774",s63:"3435" };
var title = "2009年各地区农村居民消费水平";
var unit = "元";
function getColor(d) {
    return d > 8000 ? '#800026' :
           d > 4400  ? '#BD0026' :
           d > 3800  ? '#E31A1C' :
           d > 3600  ? '#FC4E2A' :
           d > 3500   ? '#FD8D3C' :
           d > 3400  ? '#FEB24C' :
           d > 3000   ? '#FED976' :
           d > 2300   ? '#FFEDA0' :
           d < 0   ? '#000000' :
                      '#000000';
}
var vgrades = [2300, 3000, 3400, 3500, 3600, 3800, 4400, 8000];