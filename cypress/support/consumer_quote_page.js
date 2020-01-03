Cypress.Commands.add("consumer_quote",() => {


    cy.request({
        method: 'GET',
        url: 'https://prod-api.aipalette.com/api/project/4', // baseUrl is prepended to url
       headers:
        { 
        'Content-Type':'application/json',
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc4MDY3MDM0LCJqdGkiOiI5YTdiNzg1N2QxODc0ZDZjYTNjYTc2YWViMjdhZWVmYyIsInVzZXJfaWQiOjIyOX0.nFfGWzSjuLDgQYnASgLZlEekFQgGPghcpiZK9DYGVMo'
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
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc4MDY3MDU2LCJqdGkiOiIxZmEwYmE1NjgwZTg0MjRjYjU0NjVkMTRkNmI2ZDc0NCIsInVzZXJfaWQiOjIyOX0.TcVGy43Fzg_YrM2aXL9EUTDCeZ_cNjivcml6f3HtA_8'
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
           cy.writeFile('cypress/fixtures/missing_quote.txt',"Missing quote ids: " + ids + "\n", {flag:'a+'}) 
    })

})

})