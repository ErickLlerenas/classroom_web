import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import DoneIcon from '@material-ui/icons/Done';

export default function TableInputs({ calification }) {
  const [loading, setLoading] = useState(false);
  const [saved,setSaved] = useState(false);
  const [values, setValues] = useState({
    calification: calification.calification,
    exam: calification.exam,
    homework: calification.homework,
    participations: calification.participations,
  });

  useEffect(() => {}, [loading]);

  const saveCalification = async () => {
    setLoading(true);
    setSaved(false);
    await db
      .collection("students")
      .doc(calification.id.toUpperCase())
      .update(values)
      .then(() => {
        setLoading(false);
        setSaved(true);
      });
  };
  const handleChange = (e) => {
    console.log(values);
    setValues({ ...values, [e.target.name]: parseInt(e.target.value) });
  };

  return (
    <tr key={calification.id}>
      <td>{calification.id}</td>
      <td>
        <input
          max="10"
          min="0"
          type="number"
          className="cal"
          onChange={handleChange}
          name="homework"
          value={values.homework}
        ></input>
      </td>
      <td>
        <input
          max="10"
          min="0"
          type="number"
          className="cal"
          onChange={handleChange}
          name="exam"
          value={values.exam}
        ></input>
      </td>
      <td>
        <input
          max="10"
          min="0"
          type="number"
          className="cal"
          onChange={handleChange}
          name="participations"
          value={values.participations}
        ></input>
      </td>
      <td>
        <input
          max="10"
          min="0"
          type="number"
          className="cal"
          onChange={handleChange}
          name="calification"
          value={values.calification}
        ></input>
      </td>
      <td>
          {
              loading?<LinearProgress className="save-loading"/>:
        <Button variant="contained" color="primary" onClick={saveCalification}>{saved ?<DoneIcon/> :'Guardar'}</Button>}
      </td>
    </tr>
  );
}
