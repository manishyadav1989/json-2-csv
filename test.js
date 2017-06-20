var json2csv = require('./json-2-csv.js');
var arrayJSON = [{id:1, name:'Yuvraj', age:28}, {id:2, name:'Amit', age:29, address:{temporary:'J-116 Sector 12 Noida Uttar Pradesh India', permanent:'H-2 krishna temple street Gokul Mathura Uttar Pradesh '}}];
// get csv content along with header
csvData = json2csv.convertJSON2csv(arrayJSON, false); // it will return json with two propreties err and csv
// output will like this
/*
{ 
  err: null,
  csv: 'id,name,age,address_temporary,address_permanent\n1,Yuvraj,28\n2,Amit,29,J-116 Sector 12 Noida Uttar Pradesh India,H-2 krishna temple street Gokul Mathura Uttar Pradesh \n' 
}
*/

// get csv content and header of csv seprately
csvData = json2csv.convertJSON2csv(arrayJSON, true); // it will return json with two propreties err and csv
// output will like this
/*
{ 
  err: null,
  csv: '1,Yuvraj,28\n2,Amit,29,J-116 Sector 12 Noida Uttar Pradesh India,H-2 krishna temple street Gokul Mathura Uttar Pradesh \n',
  header: 'id,name,age,address_temporary,address_permanent' 
}
*/

var json = {id:2, name:'Amit', age:29, address:{temporary:'J-116 Sector 12 Noida Uttar Pradesh India', permanent:'H-2 krishna temple street Gokul Mathura Uttar Pradesh '}};
// get csv content along with header
csvData = json2csv.convertJSON2csv(json, false); // it will return json with two propreties err and csv
// output will like this
/*
{ 
  err: null,
  csv: 'id,name,age,address_temporary,address_permanent\n2,Amit,29,J-116 Sector 12 Noida Uttar Pradesh India,H-2 krishna temple street Gokul Mathura Uttar Pradesh \n' 
}
*/

// get csv content and header of csv seprately
csvData = json2csv.convertJSON2csv(json, true); // it will return json with two propreties err and csv
console.log(csvData)
// output will like this
/*
{ 
  err: null,
  csv: '2,Amit,29,J-116 Sector 12 Noida Uttar Pradesh India,H-2 krishna temple street Gokul Mathura Uttar Pradesh ',
  header: 'id,name,age,address_temporary,address_permanent' 
}
*/


