"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumDate = exports.qrGenerator = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const qrGenerator = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //this.qr = await qrcode.toDataURL("https://estarporahi.com/wp-content/uploads/2021/10/Mejores-Eventos-De-Osos-Maduros.jpg")
    //this.qr = await qrcode.toDataURL(segs)
    const qr = yield qrcode_1.default.toDataURL(`{ "point_name":"${data.name_point}", "zone_id":"${data.id}", "name_zone":"${data.adress}" }`);
    return qr;
});
exports.qrGenerator = qrGenerator;
const sumDate = (date) => {
    let array = date.split("-");
    const day = Number(array[2]) + 1;
    array[2] = day.toString();
    const cadena = array.toString();
    return cadena.replace(/,/g, "-");
};
exports.sumDate = sumDate;
