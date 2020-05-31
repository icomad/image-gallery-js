package it.polimi.tiw.imgalleryjs.utils;

import com.google.gson.Gson;
import it.polimi.tiw.imgalleryjs.exceptions.DuplicateRecord;
import it.polimi.tiw.imgalleryjs.exceptions.InternalError;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

public class SQLExceptionHandler {
    public static void evaluateError(SQLException error, HttpServletResponse res, Gson gson) throws IOException {
        var out = res.getWriter();
        var code = error.getErrorCode();
        if (code == 1062) {
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new DuplicateRecord()));
            out.flush();
        } else {
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new InternalError()));
            out.flush();
        }
    }
}
