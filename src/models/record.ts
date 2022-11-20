import mongoose, { Schema, model } from "mongoose";
import { zone_model } from "./zone";

//mongoose.pluralize(null);

interface record {
  point_name: string;
  zone_id: any;
  name_zone: string;
  id_watchman: any;
  date: string;
  time_date: string;
  name_watchman: string;
  document_watchman: string;
  latitude: number;
  longitude: number;
}

const record_schema = new Schema<record>({
  point_name: {
    type: String,
    required: true,
  },
  zone_id: {
    type: mongoose.Types.ObjectId,
    ref: "zone",
    required: true,
  },
  name_zone: {
    type: String,
    required: true,
  },
  id_watchman: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time_date: {
    type: String,
    required: true,
  },
  name_watchman: {
    type: String,
    required: true,
  },
  document_watchman: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

function getDistanciaMetros(lat1: number, lon1: number, lat2: number, lon2: number) {
  const rad = function (x: number) {
    return (x * Math.PI) / 180;
  };
  const EARTH_RADIUS = 6378.137;
  let distance_latitude = rad(lat2 - lat1);
  let dist_longitude = rad(lon2 - lon1);
  let angles =
    Math.sin(distance_latitude / 2) * Math.sin(distance_latitude / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dist_longitude / 2) * Math.sin(dist_longitude / 2);

  let round = 2 * Math.atan2(Math.sqrt(angles), Math.sqrt(1 - angles));

  let distance = EARTH_RADIUS * round * 1000;

  return distance;
}

record_schema.pre("save", async function (next) {
  const data = await zone_model.findById({ _id: this.zone_id });
 
    const points = data?.point;
    const resultado = points?.find((poin) => poin.point_name === this.point_name);
    let countLocation = 0;
    let result = false;
    if(resultado?.required_location === true){
    if (resultado?.location.length !== undefined) {
      countLocation = resultado?.location.length;
    }
    if (countLocation == 3) {
      for (let i = 0; i < 3; i++) {
        if (getDistanciaMetros(resultado?.location[0].latitude, resultado?.location[i].longitude, this.latitude, this.longitude) <= 10) result = true;
      }
      if (result) next();
      else next(new Error("AL"));
    } else next(new Error("ALN"));
  }else next()
  
});

export const record_model = model<record>("records", record_schema);
