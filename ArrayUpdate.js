//Update array of objects in immutable way

[ ...array.slice(0,index),{...a[index],'key':value},...a.slice(index)  ];

//example 

let a= [{'abc':1},{'abc':2},{'abc':3}];

let index =1;
c =[ ...a.slice(0,index),{...a[index],'abc':4},...a.slice(index)  ];
//output : - [{'abc':1},{'abc':4},{'abc':3}]
