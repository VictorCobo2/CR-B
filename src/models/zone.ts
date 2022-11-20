import mongoose, { Schema, model } from "mongoose";

mongoose.pluralize(null);

interface zone {
  adress: string;
  point: [
    {
      qr: string;
      point_name: string;
      location: [
        {
          latitude: any;
          longitude: any;
        }
      ];
      required_location:boolean
    }
  ];
  city: string;
  watchman: any;
  department: string;
}

const zone_schema = new Schema<zone>(
  {
    adress: {
      type: String,
      unique: true,
      rerquired: true,
    },
    point: {
      type: [
        {
          qr: {
            type: String,
          },
          point_name: {
            type: String,
          },
          location: [
            {
              latitude: {
                
              },
              longitude: {
                
              },
            },
          ],
          required_location:{
            type:Boolean,
            default:true
          }
        },
      ],
    },
    watchman: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      ],
      rerquired: true,
    },
    city: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);


export const zone_model = model<zone>("zone", zone_schema);
