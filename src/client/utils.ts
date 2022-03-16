interface IApi {
  host: string;
  getRoute: (routeName: string) => string;
}

class Api implements IApi {
  host: string;
  constructor(host: string) {
    this.host = host;
  }

  getRoute(routeName: string) {
    return `${this.host}/${routeName}`;
  }
}

const backendRoute: Api = Object.freeze(new Api("http://localhost:3000"));

export { backendRoute };
