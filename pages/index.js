import { useEffect, useRef, useState } from "react";
import Loader from "../components/loader";

function DynamicTablePage() {
  const inputRef = useRef();
  const [dynamicTable, setDynamicTable] = useState(false);
  const [validation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);

  //? Generate Table Function
  const generateTable = (array) => {
    setDynamicTable(
      array.map((item, outerIndex) => {
        return array.map((inner, innerIndex) => {
          if (outerIndex == innerIndex) {
            return item;
          } else if (innerIndex == array.length - (outerIndex + 1)) {
            return inner;
          } else {
            return "-";
          }
        });
      })
    );
  };

  //? Initial Table
  useEffect(() => {
    const initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    generateTable(initialArray);
  }, []);

  //? Generate Dynamic Table
  const handleSubmitNumber = () => {
    if (+inputRef.current.value % 2 != 1) {
      setLoading(true);
      setTimeout(() => {
        setValidation(false);
        setDynamicTable(false);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);

      setTimeout(() => {
        setValidation(true);

        //? Get value from input
        const selectedNumber = +inputRef.current.value;

        //? Create instance array
        let createdArray = [];
        for (let i = 0; createdArray.length < selectedNumber; i++) {
          createdArray.push(i + 1);
        }

        //? Create parsing array
        generateTable(createdArray);

        setLoading(false);
      }, 1000);
    }
  };
  // * ====================================== * //

  return (
    <>
      <div className="page-container">
        <h1>Dynamic Table UI</h1>
        <div className="input-container">
          <input
            placeholder="Please input odd number"
            ref={inputRef}
            className="inputBox"
          />
          <button onClick={handleSubmitNumber} className="button">
            Enter
          </button>

          {validation === false && (
            <p className="validation">
              *Please make sure your input is odd number!
            </p>
          )}
        </div>

        {loading && <Loader />}

        {!loading && dynamicTable && (
          <table className="generate-table">
            {dynamicTable.map((item, index) => {
              return (
                <tr key={index}>
                  {item.map((inner, innerIndex) => {
                    return (
                      <td
                        key={innerIndex}
                        className={inner !== "-" && "inner-with-data"}
                      >
                        {inner}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
}

export default DynamicTablePage;
