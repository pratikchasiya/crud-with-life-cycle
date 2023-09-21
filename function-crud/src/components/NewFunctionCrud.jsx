import React, {Fragment, useRef, useState} from "react";

const NewFunctionCrud = () => {
  const [obj, setobj] = useState({hobbies: []});
  const [array, setarray] = useState([]);
  const [blankObj, setblankObj] = useState({});
  let [count, setcount] = useState(0);
  const fileRef = useRef()

  const getData = async (e) => {
    if (e.target.name == "hobbies") {
      if (e.target.checked) {
        // obj.hobbies = [...obj.hobbies, e.target.value];
        obj.hobbies.push(e.target.value);
      } else {
        // let index = obj.hobbies.findIndex(x => x == e.target.value)
        // obj.hobbies.splice(index, 1)

        obj.hobbies = obj.hobbies.filter((x) => x != e.target.value);
      }
      blankObj.hobbies = []

    } else if (e.target.name == "profile") {
      console.log(e.target.files[0]);
      obj.profile = await toBase64(e.target.files[0]);
    } else {
      obj[e.target.name] = e.target.value;
      blankObj[e.target.name] = "";
    }
    setobj({...obj});
    setblankObj({...blankObj});
    // console.log(obj);
    // console.log(blankObj);
  };

  const save = () => {

    if(obj.id == undefined){
      count = count + 1;
      setcount(count)
      obj.id = count
      array.push(obj);
    }

    else{
      let index = array.findIndex(x => x.id == obj.id)
      array.splice(index, 1, obj)
    }
    setarray([...array]);
    console.log(array);
    setobj({...blankObj})
  };

  const editUser = (id)=>{
   let editObj = array.find(x=> x.id == id)
   setobj({...editObj})
  }

  const deleteUser = (id)=>{
    // console.log(id)
           let index = array.findIndex(x => x.id == id)
           array.splice(index, 1)
           setarray([...array])
  }
  

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <Fragment>
      <form action="" className="w-50 mx-auto border border-1 p-4 mt-5">
        <h3>FORM {obj.fname}</h3>
        <label htmlFor="" className="d-block">
          First Name
        </label>
        <input type="text" name="fname" className="w-100" value={obj.fname} onChange={getData} />
        <label htmlFor="" className="d-block">
          Last Name
        </label>
        <input type="text" name="lname" className="w-100" value={obj.lname} onChange={getData} />
        <label htmlFor="" className="d-block">
          Email
        </label>
        <input type="email" name="email" className="w-100" value={obj.email} onChange={getData} />
        <label htmlFor="" className="d-block">
          Gender
        </label>
        <input type="radio" name="gender" value="Male" checked={obj.gender == 'Male'} onChange={getData} />
        Male
        <input type="radio" name="gender" value="FeMale" checked={obj.gender == 'FeMale'} onChange={getData} />
        Female
        <label htmlFor="" className="d-block">
          Hobby
        </label>
        <input
          type="checkbox"
          name="hobbies"
          value="Cricket"
          checked={obj.hobbies.includes('Cricket')}
          onChange={getData}
        />
        Cricket
        <input
          type="checkbox"
          name="hobbies"
          value="Football"
          checked={obj.hobbies.includes('Football')}
          onChange={getData}
        />
        Footbal
        <input
          type="checkbox"
          name="hobbies"
          value="Music"
          checked={obj.hobbies.includes('Music')}
          onChange={getData}
        />
        Music
        <label htmlFor="" className="d-block">
          Profile
        </label>
        <input type="file" name="profile" onChange={getData} />
        <br />
        <button type="button" className="btn btn-success mt-4" onClick={save}>
          Save
        </button>
      </form>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {array.map((x, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img src={x.profile} alt="" height={40} width={40} />
                </td>
                <td>{x.fname}</td>
                <td>{x.lname}</td>
                <td>{x.email}</td>
                <td>{x.gender}</td>
                <td>{x.hobbies?.join(" , ")}</td>
                <td>
                  <button className="btn btn-warning ms-2" onClick={()=>editUser(x.id)}>EDIT</button>
                  <button className="btn btn-danger ms-2" onClick={()=>deleteUser(x.id)}>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default NewFunctionCrud;
