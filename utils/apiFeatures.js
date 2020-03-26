class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //query
    this.queryString = queryString; //req.query
  }

  filter() {
    //1A) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //Delete special queries
    excludedFields.forEach(el => delete queryObj[el]);

    //1B) Advanced Filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    //{difficulty: 'easy, 'duration': {$gte: 5}}
    //{ duration: { gte: '5' }, difficulty: 'easy' }
    //gte,gt,lte,lt

    //Query  the documents

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      // === sort=price
      //In moogonse sort('price ratingAverage')
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this; //return to the entire object
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); // 'name duration difficulty
    } else {
      this.query = this.query.select('-__v'); //exclude de field __v because of minus
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    //page=2&limit=10 => results from 0-10 on 1st page and results from 11-20 on 2nd page
    //skip means to start at page 2 need to jump 10 results
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
