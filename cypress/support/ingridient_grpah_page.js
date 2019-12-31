Cypress.Commands.add("ingridient_graph",() => {


    cy.request({
        method: 'GET',
        url: 'https://prod-api.aipalette.com/api/project/4', // baseUrl is prepended to url
       headers:
        { 
        'Content-Type':'application/json',
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc3ODExOTM5LCJqdGkiOiJkZTkyODk5YzRiNDk0YTIyOWE1OGM1YzQ5MmYzMThhZiIsInVzZXJfaWQiOjIyOX0.EQRi1a4KkPNYs1aDhcQeNCTZTeO4cxKD2HyM7MWmllk'
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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc3ODExOTUzLCJqdGkiOiI3OGZjODNkNWQ4ZDI0Y2EwOGQzZmY4ZTAzY2RhODczMCIsInVzZXJfaWQiOjIyOX0.Js-L4TaIopIPoxD1SKncML7t3HK2tqMvatS361Tq9eg'
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
})
})
})