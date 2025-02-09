const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const serverConfig = require('../config/serverConfig.json')

const updateSitemap = async(postUrl, type) => {
    try {
        if(serverConfig.sitemap[type]){
            const sitemapPath = path.join(serverConfig.sitemap[type].siteMapPath, serverConfig.sitemap[type].fileName);
            console.log(`${type} sitemapPath =>>`, sitemapPath)
              const xmlData = fs.readFileSync(sitemapPath, 'utf-8');
              const parser = new xml2js.Parser();
              const sitemapData = await parser.parseStringPromise(xmlData);
              const sitemapEntries = sitemapData.sitemapindex.sitemap || [];
              const sitemapEntry = sitemapEntries.find(entry => entry.loc[0] === postUrl);
              if (sitemapEntry) {
                sitemapEntry.lastmod[0] = new Date().toISOString();
                console.log(`Updated <lastmod> for: ${postUrl}`);
              } else {
                console.log(`URL not found in the sitemap: ${postUrl}`);
                const newSitemap = {
                  loc: [postUrl],
                  lastmod: [new Date().toISOString()]
                };
                sitemapEntries.push(newSitemap);
                console.log(`Added new sitemap entry for: ${postUrl}`);
              }
              const builder = new xml2js.Builder();
              sitemapData.sitemapindex.sitemap = sitemapEntries
              const updatedXml = builder.buildObject(sitemapData);
              fs.writeFileSync(sitemapPath, updatedXml, 'utf-8');
              console.log('Sitemap updated successfully!');
        }
        else{
            console.log("sitemap config not found")
        }
    } catch (err) {
      console.error('Error updating sitemap:', err);
    }
  }

  
module.exports = { updateSitemap };
    