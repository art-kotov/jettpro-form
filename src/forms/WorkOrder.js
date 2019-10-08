import React, {useEffect, useState} from "react";

import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import { workOrder } from "../shapes";
import DatePicker from "react-datepicker";
import snakeCase from "snakecase-keys";
import "react-datepicker/dist/react-datepicker.css";

// Api
import {api} from '../api'
import camelcaseKeys from "camelcase-keys";

const fetchData = {
  station: "first"
};

const getAllData = (addressArray) => {
  return Promise.all(addressArray.map(i =>
    fetch(i)
      .then(response => response.json())
  ))
};


const WorkOrder = ({init}) => {
  const [initialValue, setValue] = useState({});

  useEffect(() => {
    const asyncF = async () => {
      const response = await api.workOrderForm.fetch('256450');
      const data = await response.json();
      setValue(camelcaseKeys(data, {
        deep: true
      }));
    };
    asyncF();
    return () => {
    };
  }, []);
  return (
    Object.keys(initialValue).length !== 0 && <Formik
      initialValues={initialValue}
      validationSchema={workOrder.schema}
      render={({ values, setFieldValue }) => (
        <div className="jet-form-wrapper">
        <Form>
          date
          <Field
            component={DatePicker}
            selected={new Date(values.date)}
            onChange={date => {
              !!date ? setFieldValue("date", date) : setFieldValue("date", "");
            }}
          />
          <ErrorMessage name="date" />
          station
          <Field component="select" name="station">
            <option value="DTW">DTW</option>
            <option value="second">second</option>
            <option value="third">third</option>
          </Field>
          <ErrorMessage name="station" />
          customer
          <Field component="select" name="customer">
            <option value="RW">RW</option>
            <option value="second">second</option>
            <option value="third">third</option>
          </Field>
          <ErrorMessage name="customer" />
          customerWo
          <Field name="customerWo" />
          <ErrorMessage name="customerWo" />
          controller
          <Field name="controller" />
          <ErrorMessage name="controller" />
          aircraft type
          <Field component="select" name="aircraft">
            <option value="E-175">E-175</option>
            <option value="second">second</option>
            <option value="third">third</option>
          </Field>
          <ErrorMessage name="aircraft" />
          aircraft reg
          <Field name="aircraftReg" />
          <ErrorMessage name="aircraftReg" />
          aircraft logpage
          <Field name="aircraftLog" />
          <ErrorMessage name="aircraftLog" />
          outbound flight
          <Field component="select" name="flightNumber">
            <option value="first">first</option>
            <option value="second">second</option>
            <option value="third">third</option>
          </Field>
          <ErrorMessage name="flightNumber" />
          t received call
          <Field name="callTime" />
          <ErrorMessage name="callTime" />
          t tech arrives
          <Field name="timeTechArrives" />
          <ErrorMessage name="timeTechArrives" />
          d tech arrives
          <Field type="date" name="dateTechArrives" />
          <ErrorMessage name="dateTechArrives" />
          mx delay
          <Field component="select" name="departDelay">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Field>
          <ErrorMessage name="departDelay" />
          rii
          <Field component="select" name="riiStatus">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Field>
          <ErrorMessage name="riiStatus" />
          rii detail
          <Field name="riiDetail" />
          <ErrorMessage name="riiDetail" />
          schedule time
          <Field
            component={DatePicker}
            selected={new Date(values.departScheduledTime)}
            onChange={date => {
              !!date ? setFieldValue("departScheduledTime", date) : setFieldValue("departScheduledTime", "");
            }}
          />
          <ErrorMessage name="departScheduledTime" />
          <hr/>
          <FieldArray
            name="discrepancies"
            render={({ remove, push, name }) => (
              <div>
                {values[name].map((_, index) => (
                  <div key={index}>
                    <Field
                      component="textarea"
                      name={`${name}.${index}.reported`}
                    />
                    <ErrorMessage name={`${name}.${index}.reported`} />
                    <Field
                      component="textarea"
                      name={`${name}.${index}.action`}
                    />
                    <ErrorMessage name={`${name}.${index}.action`} />
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>
                  Add another Discrepancy
                </button>
              </div>
            )}
          />
          <hr/>
          <FieldArray
            name="parts"
            render={({ remove, push, name }) => (
              <div>
                {values[name].map((_, index) => (
                  <div key={index}>
                    <Field
                      component="select"
                      name={`${name}.${index}.pmiPart`}
                    >
                      <option value="pmiPart">1776</option>
                      <option value="second">second</option>
                    </Field>
                    <ErrorMessage name={`${name}.${index}.pmiPart`} />

                    <Field name={`${name}.${index}.qty`} />
                    <ErrorMessage name={`${name}.${index}.qty`} />

                    <Field
                      component="select"
                      name={`${name}.${index}.customerProvided`}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Field>
                    <ErrorMessage name={`${name}.${index}.customerProvided`} />

                    <Field name={`${name}.${index}.part`} />
                    <ErrorMessage name={`${name}.${index}.part`} />
                    <Field name={`${name}.${index}.partNum`} />
                    <ErrorMessage name={`${name}.${index}.partNum`} />
                    <Field name={`${name}.${index}.serial`} />
                    <ErrorMessage name={`${name}.${index}.serial`} />
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>
                  Add another Parts Used
                </button>
              </div>
            )}
          />
          <hr/>
          <FieldArray
            name="materials"
            render={({ remove, push, name }) => (
              <div>
                {values[name].map((_, index) => (
                  <div key={index}>
                    <Field
                      component="select"
                      name={`${name}.${index}.material`}
                    >
                      <option value="first">first</option>
                      <option value="second">second</option>
                    </Field>
                    <ErrorMessage name={`${name}.${index}.material`} />

                    <Field name={`${name}.${index}.qty`} />
                    <ErrorMessage name={`${name}.${index}.qty`} />

                    <Field
                      component="select"
                      name={`${name}.${index}.customerProvided`}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Field>
                    <ErrorMessage name="customerProvided" />
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>
                  Add another Materials Used
                </button>
              </div>
            )}
          />
          <hr/>
          <FieldArray
            name="equipments"
            render={({ remove, push, name }) => (
              <div>
                {values[name].map((_, index) => (
                  <div key={index}>
                    <Field
                      component="select"
                      name={`${name}.${index}.reported`}
                    >
                      <option value="Axle Jack">Axle Jack</option>
                      <option value="second">second</option>
                    </Field>
                    <ErrorMessage name={`${name}.${index}.reported`} />

                    <Field name={`${name}.${index}.hrs`} />
                    <ErrorMessage name={`${name}.${index}.hrs`} />
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>
                  Add another Equipment Used
                </button>
              </div>
            )}
          />
{/*

          <FieldArray
            name="partsUsed"
            render={({ remove, push, name }) => (
              <div>
                {values[name].map((_, index) => (
                  <div key={index}>
                    <Field
                      component="select"
                      name={`${name}.${index}.descriptionPart`}
                    >
                      <option value="first">first</option>
                      <option value="second">second</option>
                    </Field>
                    <ErrorMessage name={`${name}.${index}.descriptionPart`} />

                    <Field name={`${name}.${index}.quantity`} />
                    <ErrorMessage name={`${name}.${index}.quantity`} />

                    <Field
                      component="select"
                      name={`${name}.${index}.customerProvided`}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage name="customerProvided" />

                    <Field name={`${name}.${index}.description`} />
                    <Field name={`${name}.${index}.productNumber`} />
                    <Field name={`${name}.${index}.serialNumber`} />
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>
                  Add another Parts Used
                </button>
              </div>
            )}
          />



          <FieldArray
            name="equipmentUsed"
            render={({ remove, push, name }) => (
              <div>
                {values[name].map((_, index) => (
                  <div key={index}>
                    <Field
                      component="select"
                      name={`${name}.${index}.reported`}
                    >
                      <option value="first">first</option>
                      <option value="second">second</option>
                    </Field>
                    <ErrorMessage name={`${name}.${index}.reported`} />

                    <Field name={`${name}.${index}.correctiveAction`} />
                    <ErrorMessage name={`${name}.${index}.correctiveAction`} />
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>
                  Add another Equipment Used
                </button>
              </div>
            )}
          />

          <FieldArray
            name="laborHours"
            render={({ remove, push, name }) => (
              <div>
                {values[name].map((_, index) => (
                  <div key={index}>
                    <Field
                      component="select"
                      name={`${name}.${index}.technician`}
                    >
                      <option value="first">first</option>
                      <option value="second">second</option>
                    </Field>
                    <ErrorMessage name={`${name}.${index}.technician`} />

                    <Field name={`${name}.${index}.additionalHours`} />
                    <ErrorMessage name={`${name}.${index}.additionalHours`} />

                    <Field name={`${name}.${index}.signOff`} />
                    <ErrorMessage name={`${name}.${index}.signOff`} />
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => push("")}>
                  Add another Labor Hours
                </button>
              </div>
            )}
          />*/}
          <button type="submit">Submit</button>
        </Form>
          <pre className="popup">
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      )}
    />
  );
};

export default WorkOrder;