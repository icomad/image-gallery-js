package it.polimi.tiw.imgalleryjs.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

import java.io.IOException;

@WebFilter(filterName = "UserSignedFilter")
public class UserSignedFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        var request = (HttpServletRequest) req;
        var response = (HttpServletResponse) resp;
        var session = request.getSession();
        if (session.isNew() || session.getAttribute("user") == null) {
            var json = new JsonObject();
            json.addProperty("error", "Error! You are not signed in!");
            response.getWriter().print(json);
            response.getWriter().flush();
            return;
        }
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
