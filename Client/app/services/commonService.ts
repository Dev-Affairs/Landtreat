
import appConfig from './appConfig'
// services/commonService.ts


export async function findProperties(query?: any, limit?: number) {
    const reqData: any = {};
  
    if (query) reqData.query = query;
    if (limit) reqData.limit = limit;
  
    console.log('reqData--', reqData);
  
    try {
      let base_url:string = process.env.API_BASE_URL || appConfig.CLIENT_API_BASE_URL;
      console.log("base_url ==", base_url)
      const response = await fetch(`${base_url}api/find-properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }
  

  export async function findPost(query?: any, limit?: number) {
    const reqData: any = {};
  
    if (query) reqData.query = query;
    if (limit) reqData.limit = limit;
  
    console.log('reqData--', reqData);
  
    try {
      let base_url:string = process.env.API_BASE_URL || appConfig.CLIENT_API_BASE_URL;
      console.log("base_url ==", base_url)
      const response = await fetch(`${base_url}api/find-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }
  
export async function getLandingConfig(id: number) {
  const reqData: any = {
    id
  };
  try {
    let base_url:string = process.env.API_BASE_URL || appConfig.CLIENT_API_BASE_URL;
    console.log("base_url ==", base_url)
    const response = await fetch(`${base_url}api/find-app-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching config:', error);
    throw error;
  }
}