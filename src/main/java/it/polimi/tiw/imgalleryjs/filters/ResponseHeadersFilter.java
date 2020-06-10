package it.polimi.tiw.imgalleryjs.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "ResponseHeadersFilter")
public class ResponseHeadersFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        var response = (HttpServletResponse) resp;
        var request = (HttpServletRequest) req;
        var srcPath = request.getRequestURI();
        var contextPath = request.getServletContext().getContextPath();
        if (!srcPath.startsWith(contextPath + "/resources")){
            response.setContentType("application/json;");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
        }
        if(request.getCharacterEncoding() == null)
        {
            request.setCharacterEncoding("UTF-8");
        }
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
