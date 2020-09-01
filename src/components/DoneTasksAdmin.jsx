import React from 'react';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";

export default function DoneTasksAdmin({tasks}){
    return (
        <Card className="responsive card">
              <h2>{tasks.title}</h2>
              <form>
                <table>
                  <tbody>
                    {tasks.students.map((student) => (
                      <tr key={student.name}>
                        <td>{student.name}</td>
                        <td>
                          <Button
                            href={student.ref}
                            download
                            variant="outlined"
                            color="primary"
                            startIcon={<AssignmentReturnedIcon />}
                          >
                            Tarea
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            </Card>
    );
}