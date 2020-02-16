const category=
{
    fakeDB:[],

    init()
    {
        this.fakeDB.push({title:'Belt',image:'belt-3.jpg'});
    
        this. fakeDB.push({title:'Sleeves',image:'sleeves-3.jpg'});
    
        this.fakeDB.push({title:'Lifting-Shoes',image:'shoes-1.jpg'});

        this.fakeDB.push({title:'Wrist-Wrap',image:'wrist-wrap-3.jpg'});
        
    },

    getAllCategory()
    {
        return this.fakeDB;
    }
}

category.init();
module.exports=category;

