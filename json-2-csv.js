/*
 * Nested JSON to CSV parser
 * @Author Manish Yadav
 * @copyright Semusi Technologies Pvt Ltd @2017
 */

var json2csv = {};
(function(json2csv){
	json2csv.convertJSON2csv = function(data, isSeparate){
		json2csv.keysData = {HKEYS:[]};
		// validate data param
		if(data){
			// validate data it should be with object or object
			if( (Array.isArray(data) && data.length > 0 )
					|| (Object.keys(data).length > 0 && data.constructor === Object) 
				){
			
				// check type cast 
				if(Array.isArray(data)){
					// init csvHeaderKeys variable
					var csvHeaderKeys = [];
					var csvDataStr = '';
					// iterate data array
					data.forEach(function(element){
						var tmpData = [];
						json2csv.parseJSONObj(element);
						// get different keys into csv header
						json2csv.keysData.HKEYS.filter(function(obj) {  if(csvHeaderKeys.indexOf(obj) == -1){ csvHeaderKeys.push(obj);} });
						csvHeaderKeys.forEach(function(key){
							if(json2csv.keysData[key]){
								tmpData.push(json2csv.keysData[key]);
							}
							else{
								tmpData.push("");
							}
						});	
						
						csvDataStr += tmpData.join(",")+"\n";
						json2csv.keysData = {HKEYS:[]};
						
					});
					// clear keysData variable space from memory
					json2csv.keysData = {};
					// check send data separately or combine
					if(isSeparate){ // return csv header separately
						return {err:null, csv:csvDataStr, header:csvHeaderKeys.join(",")};
					}
					else{ // return csv header combine
						var csv = csvHeaderKeys.join(",")+"\n"+csvDataStr;
						csvHeaderKeys = [];
						return {err:null, csv:csv};
					}
				}
				else{
					var tmpData = [];
					var csvHeaderKeys = [];
					// get single object keys
					json2csv.parseJSONObj(data);
					// get different keys into csv header
					json2csv.keysData.HKEYS.filter(function(obj) {  if(csvHeaderKeys.indexOf(obj) == -1){ csvHeaderKeys.push(obj);} });
					csvHeaderKeys.forEach(function(key){
						if(json2csv.keysData[key]){
							tmpData.push(json2csv.keysData[key]);
						}
						else{
							tmpData.push("");
						}
					});	
					// clear keysData variable space from memory
					json2csv.keysData = {};
					// check send data separately or combine
					if(isSeparate){ // return csv header separately
						return {err:null, csv:tmpData.join(","), header:csvHeaderKeys.join(",")};
					}
					else{ // return csv header combine
						var csv = csvHeaderKeys.join(",")+"\n"+tmpData.join(",")+"\n";
						csvHeaderKeys = [];
						return {err:null, csv:csv};
					}
				}
			}
			else{
				// return message as error
				return {err:"Data should be array with object or object format!", csv:""};
			}
		}
		else{
			// return message as error
			console.log("Data not found!");
			return {err:"Data not found!", csv:""};
		}
	}
	
	// get json keys list
	json2csv.parseJSONObj = function(data){
		// get json object keys
		var parentKeys = json2csv.getKeys(data);
		parentKeys.forEach(function(key){
			if(data[key]){
				if(data[key].constructor === Object){
					// call nested json keys function
					json2csv.getNestedJSONKeysValues(data[key], key);
				}
				else {
					json2csv.keysData.HKEYS.push(key);
					json2csv.keysData[key] = data[key];
				}
			}
		});
		return;
	}
	
	// get nested json keys
	json2csv.getNestedJSONKeysValues = function(obj, pKey){
		var objectKeys = [];
		var childKeys = json2csv.getKeys(obj);
		childKeys.forEach(function(key){
			// check object key property
			if(obj[key] && obj[key].constructor === Object){
				objectKeys.push(key);
			}
			else {
				json2csv.keysData.HKEYS.push(pKey+"_"+key);
				json2csv.keysData[pKey+"_"+key] = obj[key];
			}
		});
		// check nested object keys
		if(objectKeys.length > 0){
			objectKeys.forEach(function(objKey){
				// push json key as column
				json2csv.keysData.HKEYS.push(pKey+'_'+objKey);
				json2csv.keysData[pKey+'_'+objKey] = '';
				// make flattern json nested keys
				json2csv.getNestedJSONKeysValues(obj[objKey], pKey+'_'+objKey);
			});
		}
		else{
			return false;
		}
	}
	
	// get parent keys of json
	json2csv.getKeys = function(obj){
		return Object.keys(obj);
	}
	
}(json2csv));
module.exports = json2csv;

