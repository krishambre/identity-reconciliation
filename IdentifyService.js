class IdentifyService {
    constructor() {
      this.dataService = new DataService();
    }
  
    getData() {
        return this.dataService.query('SELECT * FROM some_table');
      }
}