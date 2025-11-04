const urlMap = {
    "/get/the-accursed-god": "https://thelostepic.com/amazon",
    "/resume": "https://tiny.cc/vdm-doc",
    "/youtube": "https://youtube.com/@vivek.epic.echoes",
    "/instagram": "https://instagram.com/vivekduttamishra"
};

class RedirectorService {
    async getRedirectUrl(path) {
        if (urlMap[path]) {
            return urlMap[path];
        }
    }

    async addRedirect(from, to) {
        urlMap[from] = to;
    }
}

export default new RedirectorService();