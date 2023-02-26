function pincode() {
	var pin = document.getElementById("pincode").value;
	var url = `https://api.postalpincode.in/pincode/`;
	url+=pin;
	var obj='';
	fetch(url)
		.then(response=>response.json())
		.then(data=>{
			obj+=`<thead class="thead-dark"><tr>`;
				obj+=`<th>S.No</th>`;
				obj+=`<th>Name</th>`;
				obj+=`<th>BranchType</th>`;
				obj+=`<th>Division</th>`;
				obj+=`<th>District</th>`;
				obj+=`<th>Region</th>`;
				obj+=`<th>Circle</th>`;
				obj+=`<th>Pincode</th>`;
				obj+=`<th>State</th>`;
				obj+=`<th>Country</th>`;
				obj+=`</tr></thead>`;
			for(let i = 0;i<data[0].PostOffice.length;i++)
			{
				obj+=`<tr>`;
				obj+=`<th scope="row">${i+1}</th>`;
				obj+=`<td>${data[0].PostOffice[i].Name}</td>`;
				obj+=`<td>${data[0].PostOffice[i].BranchType}</td>`;
				obj+=`<td>${data[0].PostOffice[i].Division}</td>`;
				obj+=`<td>${data[0].PostOffice[i].District}</td>`;
				obj+=`<td>${data[0].PostOffice[i].Region}</td>`;
				obj+=`<td>${data[0].PostOffice[i].Circle}</td>`;
				obj+=`<td>${data[0].PostOffice[i].Pincode}</td>`;
				obj+=`<td>${data[0].PostOffice[i].State}</td>`;
				obj+=`<td>${data[0].PostOffice[i].Country}</td>`;
				obj+=`</tr>`;
			}
			document.querySelector("#error").innerHTML = "";
			document.getElementById("tab").innerHTML = obj;
		})
		.catch(err=>{
			document.getElementById("tab").innerHTML = "";
			document.querySelector("#error").innerHTML = "No data found";
		})
}

