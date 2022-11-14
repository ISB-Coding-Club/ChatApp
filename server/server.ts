import * as express from "express";
import * as vite from "vite";
import * as fs from "fs";
import * as path from "path";

export const handleRequest = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    viteS: vite.ViteDevServer
) => {
    const url = req.originalUrl;

    try {
        // 1. Read index.html
        let template = fs.readFileSync(
            path.resolve(__dirname, "index.html"),
            "utf-8"
        );

        // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
        //    also applies HTML transforms from Vite plugins, e.g. global preambles
        //    from @vitejs/plugin-react
        template = await viteS.transformIndexHtml(url, template);

        // 3. Load the server entry. vite.ssrLoadModule automatically transforms
        //    your ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        const { render } = await viteS.ssrLoadModule("/src/entry-server.js");

        // 4. render the app HTML. This assumes entry-server.js's exported `render`
        //    function calls appropriate framework SSR APIs,
        //    e.g. ReactDOMServer.renderToString()
        const appHtml = await render(url);

        // 5. Inject the app-rendered HTML into the template.
        const html = template.replace(`<!--ssr-outlet-->`, appHtml);

        // 6. Send the rendered HTML back.
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
        // If an error is caught, let Vite fix the stack trace so it maps back to
        // your actual source code.
        viteS.ssrFixStacktrace(e as any);
        next(e);
    }
};
