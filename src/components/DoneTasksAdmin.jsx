import React from 'react';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ImageIcon from '@material-ui/icons/Image';
export default function DoneTasksAdmin({tasks}){
    return (
        <Card className="responsive card">
              <h2>{tasks.title}</h2>
              <form style={{overflowX:'auto'}}>
                <table>
                  <tbody>
                    {tasks.students.map((student) => (
                      <tr key={student.name}>
                        <td>{student.name}</td>
                        {student.ref.map((reference,index)=>(
                          <td key={index}>
                          <Button
                            href={reference}
                            download
                            target="_blank"
                            variant="outlined"
                            color="primary"
                            startIcon={<ImageIcon />}
                          >{`${index+1}`}</Button>
                        </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            </Card>
    );
}