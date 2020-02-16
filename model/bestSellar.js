// BestSeller
const BestSeller=
{
    fakeDB:[],

    init()
    {
        this.fakeDB.push({id:'belt-list1', type:'belt', class:'product-belt',title:'Inzer Forever 10mm Lever Belt',image:'belt-1.jpg ',price:`$128.00 CAD`,isBest:`right`});
        this.fakeDB.push({id:'belt-list2', type:'belt', class:'product-belt',title:'Inzer Forever 10mm Prong Belt',image:'belt-2.jpg',price:`$128.00 CAD`, isBest:`right`});
        this.fakeDB.push({id:'belt-list3', type:'belt', class:'product-belt',title:'SBD Belt',image:'belt-3.jpg',price:`$285.00 CAD`,isBest:`no`});
        this.fakeDB.push({id:'belt-list4', type:'belt', class:'product-belt',title:'Inzer Forever 10mm Lever Belt',image:'belt-4.jpg',price:`$128.00 CAD`,isBest:`no`});
    
        this. fakeDB.push({id:'lifting-shoes-list1',type:'shoes', class:'product-shoes',title:'Nike Romaleos 2 Men',image:'shoes-1.jpg',price:`$270.00 CAD`, isBest:`right`});
        this. fakeDB.push({id:'lifting-shoes-list2',type:'shoes', class:'product-shoes',title:'Sabo Goodlift - Black & Red',image:'shoes-2.jpg',price:`$130.00 CAD`,isBest:`no`});
        this. fakeDB.push({id:'lifting-shoes-list3',type:'shoes', class:'product-shoes',title:'Sabo Deadlift - Red & Red',image:'shoes-3.jpg',price:`$115.00 CAD`,isBest:`no`});
        this. fakeDB.push({id:'lifting-shoes-list4',type:'shoes', class:'product-shoes',title:'Sabo Deadlift - Lime',image:'shoes-4.jpg',price:`$115.00 CAD`,isBest:`no`});
    
        this.fakeDB.push({id:'wrist-wrap-list1', type:'wrist', class:'product-wrist', title:'Inzer Gripper Wrist Wraps',image:'wrist-wrap-1.jpg',price:`$42.00 CAD`, isBest:`right`});
        this.fakeDB.push({id:'wrist-wrap-list2', type:'wrist', class:'product-wrist', title:'Inzer Iron Z Wrist Wraps',image:'wrist-wrap-2.jpg',price:`$28.00 CAD`,isBest:`no`});
        this.fakeDB.push({id:'wrist-wrap-list3', type:'wrist', class:'product-wrist', title:'SBD Wrist Wraps - Black & Red',image:'wrist-wrap-3.jpg',price:`$53.00 CAD`,isBest:`no`});
        this.fakeDB.push({id:'wrist-wrap-list4', type:'wrist', class:'product-wrist', title:'Sling Shot Gangsta Wraps',image:'wrist-wrap-4.jpg',price:`$67.00 CAD`, isBest:`right`});

        this.fakeDB.push({id:'sleeves-1',type:'sleeves', class:'product-sleeves',  title:'SBD Elbow Sleeves - Black & Red',image:'sleeves-1.jpg',price:`$79.00 CAD`, isBest:`right`});
        this.fakeDB.push({id:'sleeves-1',type:'sleeves', class:'product-sleeves', title:'SBD Knee Sleeves - Eclipse Line',image:'sleeves-2.jpg',price:`$115.00 CAD`,isBest:`no`});
        this.fakeDB.push({id:'sleeves-1',type:'sleeves', class:'product-sleeves',  title:'SBD Knee Sleeves - Black & Red',image:'sleeves-3.jpg',price:`$106.00 CAD`, isBest:`right`});
        this.fakeDB.push({id:'sleeves-1',type:'sleeves', class:'product-sleeves', title:'Rehband RX Original Knee Sleeve',image:'sleeves-4.jpg',price:`$54.99 CAD`,isBest:`no`});

    },

    getAllBestSeller()
    {
        return this.fakeDB;
    },

    getFilteredBestSellar (type){
        return this.fakeDB.filter(BestSeller => BestSeller.type === type);
    }

}
BestSeller.init();
module.exports=BestSeller;

