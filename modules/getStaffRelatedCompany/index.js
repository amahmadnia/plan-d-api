const CompanyStaff = require('./../../db/models/CompanyStaff');
const BTCompany = require('./../../db/models/BTCompany');

const getCompany = async (inputDataArr) => {
  try {
    const btCompanies = await BTCompany.query()
      .where('deleted', false)
      .withGraphFetched('pdCompany');

    let output = [];

    for (let i = 0; i < inputDataArr.length; i++) {
      let companyName = '---';

      for (let j = 0; j < btCompanies.length; j++) {
        try {
          const currentCompany = await CompanyStaff.query()
            .select('companyId')
            .findById(inputDataArr[i].staffId)
            .where('deleted', false);

          if (currentCompany.companyId === btCompanies[j].pdCompany[0].id)
            companyName = btCompanies[j].name;
        } catch (error) {
          return 500;
        }
      }

      output.push({
        ...inputDataArr[i],
        company: companyName,
      });
    }

    return output;
  } catch (error) {
    return 500;
  }
};

module.exports = getCompany;
