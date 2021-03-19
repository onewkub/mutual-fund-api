function main() {
  console.log('Database:', process.env.DATABASE_URL)
  console.log('Ontology:', process.env.ONTOLOGY_API)
  console.log('AI', process.env.PREDICT_API)
}

main()
