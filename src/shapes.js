// Core
import { object, string, boolean, date, number, array } from "yup";

export const login = {
  shape: {
    email: "a.k@nord-soft.com",
    password: "123"
  },
  schema: object().shape({
    email: string()
      .email("Error type")
      .required(),
    password: string()
      .min(3)
      .required()
  })
};

export const workOrder = {
  shape: {
    // Work Order Header
    date: new Date("2019-12-03"),
    station: "first",
    customer: "",
    customerWo: "",
    contollerName: "",
    aircraftType: "",
    aircraftRegistration: "",
    aircraftLogPage: "",
    outboundFlight: "",
    timeReceiveCall: "",
    timeTechArrives: "",
    dateTechArrives: "",
    mxDelay: "true",
    rii: "false",
    riiDetail: "",
    departureTime: "",
    // Discrepancies
    discrepancies: [],
    // Parts Used
    partsUsed: [],
    // Materials Used
    materialsUsed: [
      {
        material: "select",
        quantity: 0,
        customerProvided: "false"
      }
    ],
    // Equipment Used
    equipmentUsed: [],
    // Labor Hours
    laborHours: [],
    // Servicing Distribution
    engineOil: [0, 0, 0, 0],
    idcCsd: [0, 0, 0, 0],
    apu: 0,
    oilType: "",
    customerProvided: "false",
    noUsedOil: false,
    engineGroup: [],
    type: "",
    // Notes
    notes: "",
    // Sign Off
    signOff: []
  },
  schema: object().shape({
    // Work Order Header
    date: date().required()
    // station: string().required(),
    // customer: string().required(),
    // customerWo: string().required('обязательное поле'),
    // contollerName: string().required(),
    // aircraftType: string().required(),
    // aircraftRegistration: number().required(),
    // aircraftLogPage: string().required(),
    // outboundFlight: number().required(),
    // timeReceiveCall: number().required(),
    // timeTechArrives: number().required(),
    // dateTechArrives: date().required(),
    // mxDelay: boolean().required(),
    // rii: boolean().required(),
    // riiDetail: string().required(),
    // departureTime: date().required(),
    // // Discrepancies
    // discrepancies: array().of(
    //   object().shape({
    //     reported: string().required(),
    //     correctiveAction: string().required()
    //   })
    // ),
    // // Parts Used
    // partsUsed: array().of(
    //   object().shape({
    //     descriptionPart: string().required(),
    //     quantity: number().required(),
    //     customerProvided: boolean().required(),
    //     description: string().required(),
    //     productNumber: string().required(),
    //     serialNumber: string().required()
    //   })
    // ),
    // // Materials Used
    // materialsUsed: array().of(
    //   object().shape({
    //     material: string().required(),
    //     quantity: number().required(),
    //     customerProvided: boolean().required(),
    //   })
    //   ),
    // // Equipment Used
    // equipmentUsed: array().of(
    //   object().shape({
    //     reported: string().required(),
    //     correctiveAction: string().required()
    //   })
    //   ),
    // // Labor Hours
    // laborHours: array().of(
    //   object().shape({
    //     technician: string().required(),
    //     additionalHours: number().required(),
    //     signOff: number().required(),
    //   })
    //   ),
    // // Servicing Distribution
    // engineOil: [0, 0, 0, 0],
    // idcCsd: [0, 0, 0, 0],
    // apu: 0,
    // oilType: "",
    // customerProvided: "false",
    // noUsedOil: false,
    // engineGroup: [],
    // type: "",
    // // Notes
    // notes: "",
    // // Sign Off
    // signOff: []
  })
};
