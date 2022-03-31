var productName = document.getElementById('productName');
    var productCategory = document.getElementById( 'productCategory');
    var productPrice = document.getElementById('productPrice');
    var productDescription = document.getElementById('ProductDescription');
var products = [];
if(localStorage.getItem('products',products) == null)
{
    products = [];
}
else
{
    products = JSON.parse(localStorage.getItem('products',products));
    display();
}
function getData(){
    var product = {
        name:productName.value,
        category:productCategory.value,
        price:productPrice.value,
        description:productDescription.value
    };
    products.push(product);
    localStorage.setItem('products',JSON.stringify(products));
    display();
}
function display(){
    var x = "";
for(var i = 0; i < products.length; i++)
{
    x +=  `<tr>
                <td>${i + 1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].category}</td>
                <td>${products[i].price}</td>
                <td>${products[i].description}</td>
                <td><button onclick="update(${i})" class="btn bg-info w-100 p-2">Update</button></td>
                <td><button onclick="del(${i})" class="btn bg-danger w-100 p-2">Delete</button></td>
            </tr>`;
}
document.getElementById('demo').innerHTML = x;
}

function del(index){
    products.splice(index,1);
    localStorage.setItem('products',JSON.stringify(products));
    display();
}
function clr(){
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDescription.value = "";
}
function update(index)
{
    document.getElementById('add').style.display = "none";
    document.getElementById('cont').innerHTML = `<button onclick="updateProduct(${index})" class="w-100 btn btn-info my-5">Update</button>`
    productName.value = products[index].name;
    productCategory.value = products[index].category;
    productPrice.value = products[index].price;
    productDescription.innerHTML = products[index].description;
}
function updateProduct(index)
{
    products[index].name = productName.value;
    products[index].category = productCategory.value;
    products[index].price = productPrice.value;
    products[index].description = productDescription.value;
    localStorage.setItem('products',JSON.stringify(products));
    display();
    clr();
    document.getElementById('add').style.display = "block";
    document.getElementById('cont').innerHTML = '';
}

function search(searchIn){
    var searchResult='';
    for(var i = 0; i < products.length; i++)
    {
        if(products[i].name.toLowerCase().includes(searchIn.toLowerCase()))
        {
            searchResult += `<tr>
                                <td>${i + 1}</td>
                                <td>${products[i].name.replace(searchIn, `<span>${searchIn}</span>`)}</td>
                                <td>${products[i].category}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].description}</td>
                                <td><button onclick="update(${i})" class="btn bg-info w-100 p-2">Update</button></td>
                                <td><button onclick="del(${i})" class="btn bg-danger w-100 p-2">Delete</button></td>
                            </tr>`;
        }
    }
    document.getElementById('demo').innerHTML = searchResult;
}