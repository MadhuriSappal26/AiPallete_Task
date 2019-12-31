Cypress.Commands.add("consumer_quote",() => {


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
        var sub_categories_array=response.body.sub_categories      // Get the SubCategories from array
        var final_ing_list=[]
       sub_categories_array.forEach(($obj)=>
       {
        console.log($obj[0].ingredient,$obj[0].name)               //Get the Ingridient id and name from array
       var ingList=$obj[0].ingredient
       final_ing_list.push(ingList)
      })
     

    final_ing_list.forEach((ids)=>
    {
        cy.request({
            method: 'GET',
            url: 'https://prod-api.aipalette.com/api/ingredients/ingredient/'+ids+'/quotes/', // baseUrl is prepended to url, id are dynamically fetched one by one
           headers:
            { 
            'Content-Type':'application/json',
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc3ODExOTUzLCJqdGkiOiI3OGZjODNkNWQ4ZDI0Y2EwOGQzZmY4ZTAzY2RhODczMCIsInVzZXJfaWQiOjIyOX0.Js-L4TaIopIPoxD1SKncML7t3HK2tqMvatS361Tq9eg'
            },
        
        }).then((response)=>{
            var weibo_quotes_array=response.body.weibo_quotes        //Get the Weibo quotes of consumer of particular id
            if(weibo_quotes_array.length==0)                         //If consumer quote is missing
            {
                console.log("missing customer quote.....", ids)       //Get the id's whose consumer quote is missing
                console.log(response.body)
                expect(response.body.weibo_quotes).to.have.length(0)
            }
           
           })
        
    })
})
})