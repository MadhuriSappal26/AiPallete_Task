Cypress.Commands.add("ingridient_graph",() => {


    cy.request({
        method: 'GET',
        url: 'https://prod-api.aipalette.com/api/project/4', // baseUrl is prepended to url
       headers:
        { 
        'Content-Type':'application/json',
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc4MDY3MDU2LCJqdGkiOiIxZmEwYmE1NjgwZTg0MjRjYjU0NjVkMTRkNmI2ZDc0NCIsInVzZXJfaWQiOjIyOX0.TcVGy43Fzg_YrM2aXL9EUTDCeZ_cNjivcml6f3HtA_8'
        },
        'failOnStatusCode': 'false'
        
    
    })
    .then((response)=>
    {
        expect(response.body.sub_categories).to.not.have.length(0)      
        var sub_categories_array=response.body.sub_categories      //Get the subcategories
        var final_ing_list=[]
       sub_categories_array.forEach(($obj)=>
       {
      var ingList=$obj[0].ingredient                              //Get the ingredients from subcategories
      final_ing_list.push(ingList)
      })

    final_ing_list.forEach((ids)=>
    {
        cy.request({
            method: 'GET',
            url: 'https://prod-api.aipalette.com/api/ingredients/ingredient/'+ids+'/', // baseUrl is prepended to url,get the id's one by one
           headers:
            { 
            'Content-Type':'application/json',
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc4MDY3MDU2LCJqdGkiOiIxZmEwYmE1NjgwZTg0MjRjYjU0NjVkMTRkNmI2ZDc0NCIsInVzZXJfaWQiOjIyOX0.TcVGy43Fzg_YrM2aXL9EUTDCeZ_cNjivcml6f3HtA_8'
            },
            'failOnStatusCode': 'false'
        
        }).then((response)=>{
            var trend_chart_array=response.body.trendChart                //Get the charts
            
            //console.log(trend_chart_array)
            if(trend_chart_array.length==0)                               //Get the ingridient having missing chart
            {
                console.log("missing ingridient graph.....")
                console.log(response.body)
                expect(response.body.trendChart).to.have.length(0)
            }

    })
    cy.writeFile('cypress/fixtures/missing_graph.txt',"Missing graph ids: " + ids + "\n", {flag:'a+'}) 
})
})
})