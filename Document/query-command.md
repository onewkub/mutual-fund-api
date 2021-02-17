# Query-Command

## Prefix

```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX mat: <http://www.semanticweb.org/wachi/ontologies/2021/1/mutual-fund-ontology#>
```

## Get Fund & Fund

```SPRAQL
SELECT *
  Where {
    ?fund mat:FundType ?fundType;
    mat:FundName ?name;
    mat:FundSymbol ?symbol;
    mat:Risk ?risk;
    mat:MaxProfit ?maxProfit;
    mat:MaxLoss ?maxLoss;
    mat:SD ?SD;
    mat:Dividen ?dividend.
  }

```
