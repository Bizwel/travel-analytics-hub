export function summarizeFolderStatus(rows) {

    let invoiced = 0;
    let uninvoiced = 0;
    let others = 0;

    rows.forEach((row) => {

        const status = (row["Folder Status"] || "")
            .trim()
            .toLowerCase();

        switch (status) {

            case "invoiced":

                invoiced++;
                break;

            case "partial refund":

                invoiced++;
                break;

            case "uninvoiced":

                uninvoiced++;
                break;

            case "refund request":

                uninvoiced++;
                break;

            default:

                others++;
        }

    });

    return {

        total: rows.length,

        invoiced,

        uninvoiced,

        others

    };

}
