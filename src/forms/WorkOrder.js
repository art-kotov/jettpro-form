import React, { useEffect, useState } from "react";

import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import { workOrder } from "../shapes";
import DatePicker from "react-datepicker";
import snakeCase from "snakecase-keys";
import "react-datepicker/dist/react-datepicker.css";

// Api
import { api, address, headers } from '../api'
import camelcaseKeys from "camelcase-keys";

// Helper
const asyncDelay = delay =>
  new Promise(resolve => setTimeout(resolve, delay));

const addressArray = [
  {
    name: "stations",
    address: `${address}core/station`
  },
  {
    name: "customers",
    address: `${address}core/customer`
  },
  {
    name: "aircrafts",
    address: `${address}core/aircraft`
  },
  {
    name: "parts",
    address: `${address}jems/g2-part`
  },
];

const getAllData = async array => {
  return await Promise.all(array.map(({ address }) => fetch(address, {
    method: 'GET',
    headers
  }).then(data => {
    return data.status === 200 ? data.json() : 'error'
  })));
};


const WorkOrder = () => {
  const [initialValues, setInitial] = useState(false);
  const [additionalValues, setAdditional] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await api.workOrderForm.fetch('256450');
        const data = await response.json();
        setInitial(camelcaseKeys(data, {
          deep: true
        }));

        //  fetch  data for selects
        const otherData = await getAllData(addressArray);

        const error = otherData.some(i => i === 'error');
        if (error) throw new Error('oops');

        console.log(otherData);
        setAdditional(
          {
            "stations": otherData[0].results,
            "customers": otherData[1].results,
            "aircrafts": otherData[2].results,
            "parts": otherData[3].results,
          }
        )


      } catch (e) {
        console.log(e)
      }
    };
    fetchAll();
    return () => {
    };
  }, []);
  return (
    initialValues && additionalValues ? (<Formik
      initialValues={initialValues}
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
            <ErrorMessage name="date"/>
            station
            <Field component="select" name="station">
              {
                additionalValues['stations'].map(
                  (item) => <option key={item.id} value={item.id}>{item.name}</option>
                )
              }
            </Field>
            <ErrorMessage name="station"/>
            customer
            <Field component="select" name="customer">
              {
                additionalValues['customers'].map(
                  (item) => <option key={item.id} value={item.id}>{item.name}</option>
                )
              }
            </Field>
            <ErrorMessage name="customer"/>
            customerWo
            <Field name="customerWo"/>
            <ErrorMessage name="customerWo"/>
            controller
            <Field name="controller"/>
            <ErrorMessage name="controller"/>
            aircraft type
            <Field component="select" name="aircraft">
              {
                additionalValues['aircrafts'].map(
                  (item) => <option key={item.id} value={item.id}>{item.name}</option>
                )
              }
            </Field>
            <ErrorMessage name="aircraft"/>
            aircraft reg
            <Field name="aircraftReg"/>
            <ErrorMessage name="aircraftReg"/>
            aircraft logpage
            <Field name="aircraftLog"/>
            <ErrorMessage name="aircraftLog"/>
            outbound flight
            <Field name="flightNumber" />
            <ErrorMessage name="flightNumber"/>
            t received call
            <Field name="callTime"/>
            <ErrorMessage name="callTime"/>
            t tech arrives
            <Field name="timeTechArrives"/>
            <ErrorMessage name="timeTechArrives"/>
            d tech arrives
            <Field type="date" name="dateTechArrives"/>
            <ErrorMessage name="dateTechArrives"/>
            mx delay
            <Field component="select" name="departDelay">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Field>
            <ErrorMessage name="departDelay"/>
            rii
            <Field component="select" name="riiStatus">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Field>
            <ErrorMessage name="riiStatus"/>
            rii detail
            <Field name="riiDetail"/>
            <ErrorMessage name="riiDetail"/>
            schedule time
            <Field
              component={DatePicker}
              dateFormat="MM/dd/yyyy h:mm"
              selected={new Date(values.departScheduledTime)}
              onChange={date => {
                !!date ? setFieldValue("departScheduledTime", date) : setFieldValue("departScheduledTime", "");
              }}
            />
            <ErrorMessage name="departScheduledTime"/>
            {/*<hr/>*/}
            {/*<FieldArray*/}
            {/*  name="discrepancies"*/}
            {/*  render={({ remove, push, name }) => (*/}
            {/*    <div>*/}
            {/*      {values[name].map((_, index) => (*/}
            {/*        <div key={index}>*/}
            {/*          <Field*/}
            {/*            component="textarea"*/}
            {/*            name={`${name}.${index}.reported`}*/}
            {/*          />*/}
            {/*          <ErrorMessage name={`${name}.${index}.reported`}/>*/}
            {/*          <Field*/}
            {/*            component="textarea"*/}
            {/*            name={`${name}.${index}.action`}*/}
            {/*          />*/}
            {/*          <ErrorMessage name={`${name}.${index}.action`}/>*/}
            {/*          <button type="button" onClick={() => remove(index)}>*/}
            {/*            -*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*      ))}*/}
            {/*      <button type="button" onClick={() => push("")}>*/}
            {/*        Add another Discrepancy*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*/>*/}
            <hr/>
            {initialValues.part && <FieldArray
              name="parts"
              render={({ remove, push, name }) => (
                <div>
                  {values[name].map((_, index) => (
                    <div key={index}>
                      <Field
                        component="select"
                        name={`${name}.${index}.pmiPart`}
                      >
                        {
                          additionalValues['parts'].map(
                            (item) => <option key={item.id} value={item.id}>{item.name}</option>
                          )
                        }
                      </Field>
                      <ErrorMessage name={`${name}.${index}.pmiPart`}/>

                      <Field name={`${name}.${index}.qty`}/>
                      <ErrorMessage name={`${name}.${index}.qty`}/>

                      <Field
                        component="select"
                        name={`${name}.${index}.customerProvided`}
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </Field>
                      <ErrorMessage name={`${name}.${index}.customerProvided`}/>

                      <Field name={`${name}.${index}.part`}/>
                      <ErrorMessage name={`${name}.${index}.part`}/>
                      <Field name={`${name}.${index}.partNum`}/>
                      <ErrorMessage name={`${name}.${index}.partNum`}/>
                      <Field name={`${name}.${index}.serial`}/>
                      <ErrorMessage name={`${name}.${index}.serial`}/>
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
            />}
            {/*<hr/>*/}
            {/*<FieldArray*/}
            {/*  name="materials"*/}
            {/*  render={({ remove, push, name }) => (*/}
            {/*    <div>*/}
            {/*      {values[name].map((_, index) => (*/}
            {/*        <div key={index}>*/}
            {/*          <Field*/}
            {/*            component="select"*/}
            {/*            name={`${name}.${index}.material`}*/}
            {/*          >*/}
            {/*            <option value="first">first</option>*/}
            {/*            <option value="second">second</option>*/}
            {/*          </Field>*/}
            {/*          <ErrorMessage name={`${name}.${index}.material`}/>*/}

            {/*          <Field name={`${name}.${index}.qty`}/>*/}
            {/*          <ErrorMessage name={`${name}.${index}.qty`}/>*/}

            {/*          <Field*/}
            {/*            component="select"*/}
            {/*            name={`${name}.${index}.customerProvided`}*/}
            {/*          >*/}
            {/*            <option value={true}>Yes</option>*/}
            {/*            <option value={false}>No</option>*/}
            {/*          </Field>*/}
            {/*          <ErrorMessage name="customerProvided"/>*/}
            {/*          <button type="button" onClick={() => remove(index)}>*/}
            {/*            -*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*      ))}*/}
            {/*      <button type="button" onClick={() => push("")}>*/}
            {/*        Add another Materials Used*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*/>*/}
            {/*<hr/>*/}
            {/*<FieldArray*/}
            {/*  name="equipments"*/}
            {/*  render={({ remove, push, name }) => (*/}
            {/*    <div>*/}
            {/*      {values[name].map((_, index) => (*/}
            {/*        <div key={index}>*/}
            {/*          <Field*/}
            {/*            component="select"*/}
            {/*            name={`${name}.${index}.reported`}*/}
            {/*          >*/}
            {/*            <option value="Axle Jack">Axle Jack</option>*/}
            {/*            <option value="second">second</option>*/}
            {/*          </Field>*/}
            {/*          <ErrorMessage name={`${name}.${index}.reported`}/>*/}

            {/*          <Field name={`${name}.${index}.hrs`}/>*/}
            {/*          <ErrorMessage name={`${name}.${index}.hrs`}/>*/}
            {/*          <button type="button" onClick={() => remove(index)}>*/}
            {/*            -*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*      ))}*/}
            {/*      <button type="button" onClick={() => push("")}>*/}
            {/*        Add another Equipment Used*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*/>*/}
            {/*<hr/>*/}
            {/*<FieldArray*/}
            {/*  name="laborhours"*/}
            {/*  render={({ remove, push, name }) => (*/}
            {/*    <div>*/}
            {/*      {values[name].map((_, index) => (*/}
            {/*        <div key={index}>*/}
            {/*          <Field*/}
            {/*            component="select"*/}
            {/*            name={`${name}.${index}.employee`}*/}
            {/*          >*/}
            {/*            <option value="816">816</option>*/}
            {/*            <option value="second">second</option>*/}
            {/*          </Field>*/}
            {/*          <ErrorMessage name={`${name}.${index}.employee`}/>*/}

            {/*          <Field name={`${name}.${index}.sgnHrs`}/>*/}
            {/*          <ErrorMessage name={`${name}.${index}.sgnHrs`}/>*/}

            {/*          <Field name={`${name}.${index}.uscHrs`}/>*/}
            {/*          <ErrorMessage name={`${name}.${index}.uscHrs`}/>*/}
            {/*          <button type="button" onClick={() => remove(index)}>*/}
            {/*            -*/}
            {/*          </button>*/}
            {/*        </div>*/}
            {/*      ))}*/}
            {/*      <button type="button" onClick={() => push("")}>*/}
            {/*        Add another Labor Hours*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*/>*/}
            {/*<hr/>*/}
            servicing distribution
            <Field name="engineOil1"/>
            <ErrorMessage name="engineOil1"/>
            <Field name="engineOil2"/>
            <ErrorMessage name="engineOil2"/>
            <Field name="engineOil3"/>
            <ErrorMessage name="engineOil3"/>
            <Field name="engineOil4"/>
            <ErrorMessage name="engineOil4"/>
            total: {values.engineOilQtyTotal}
            <Field name="engineIdg1"/>
            <ErrorMessage name="engineIdg1"/>
            <Field name="engineIdg2"/>
            <ErrorMessage name="engineIdg2"/>
            <Field name="engineIdg3"/>
            <ErrorMessage name="engineIdg3"/>
            <Field name="engineIdg4"/>
            <ErrorMessage name="engineIdg4"/>
            total: {values.hydraulicFluidQtyTotal}
            <Field name="engineOilApu"/>
            <ErrorMessage name="engineOilApu"/>

            <Field component="select" name="engineOilType">
              <option value="2">second</option>
              <option value="3">3</option>
            </Field>
            <ErrorMessage name="engineOilType"/>

            <Field component="select" name="engineOilCp">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Field>
            <ErrorMessage name="engineOilCp"/>

            <Field type="checkbox" name="engineOilNu"/>
            <ErrorMessage name="engineOilNu"/>
            engine oil
            <Field name="hydraulicFluidQty"/>
            <ErrorMessage name="hydraulicFluidQty"/>
            <Field component="select" name="hydraulicFluidCp">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Field>
            <ErrorMessage name="hydraulicFluidCp"/>
            <Field name="hydraulicType"/>
            <ErrorMessage name="hydraulicType"/>
            n2
            <Field name="n2Qty"/>
            <ErrorMessage name="n2Qty"/>
            <Field component="select" name="n2Cp">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Field>
            <ErrorMessage name="n2Cp"/>
            02
            <Field name="o2Qty"/>
            <ErrorMessage name="o2Qty"/>
            <Field component="select" name="o2Cp">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Field>
            <ErrorMessage name="o2Cp"/>

            <hr/>
            notes
            <Field
              component="textarea"
              name="notes"
            />
            <ErrorMessage name="notes"/>
            <hr/>
            sign off
            {/*            <FieldArray
              name="techtimes"
              render={({ remove, push, name }) => (
                <div>
                  {values[name].map((_, index) => {
                    return (
                      <div key={index}>
                        <Field
                          component={DatePicker}
                          selected={new Date(values[name][index].arrivedTime)}
                          onChange={date => {
                            !!date ? setFieldValue(`${name}.${index}.arrivedTime`, date) : setFieldValue(`${name}.${index}.arrivedTime`, "");
                          }}
                        />
                        <Field name={`${name}.${index}.arrivedTime`}/>
                        <ErrorMessage name={`${name}.${index}.arrivedTime`}/>

                        <Field
                          component={DatePicker}
                          selected={new Date(values[name][index].soReleasedDate)}
                          onChange={date => {
                            !!date ? setFieldValue(`${name}.${index}.soReleasedDate`, date) : setFieldValue(`${name}.${index}.soReleasedDate`, "");
                          }}
                        />
                        <Field name={`${name}.${index}.soReleasedDate`}/>
                        <ErrorMessage name={`${name}.${index}.soReleasedDate`}/>

                        <Field
                          component={DatePicker}
                          selected={new Date(values[name][index].soTaskscompletedDate)}
                          onChange={date => {
                            !!date ? setFieldValue(`${name}.${index}.soTaskscompletedDate`, date) : setFieldValue(`${name}.${index}.soTaskscompletedDate`, "");
                          }}
                        />
                        <Field name={`${name}.${index}.soTaskscompletedDate`}/>
                        <ErrorMessage name={`${name}.${index}.soTaskscompletedDate`}/>
                        <Field component="select" name="soReleaseType">
                          <option value="AP">AP</option>
                          <option value="PA">PA</option>
                        </Field>
                        <Field name={`${name}.${index}.otherDetails`}/>
                        <ErrorMessage name={`${name}.${index}.otherDetails`}/>
                        <button type="button" onClick={() => remove(index)}>
                          -
                        </button>
                      </div>
                    )
                  })}
                  <button type="button" onClick={() => push("")}>
                    Add another Discrepancy
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
    />) : null
  );
};

export default WorkOrder;