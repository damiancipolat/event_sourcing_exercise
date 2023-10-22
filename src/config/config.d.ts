type Tconfig={
    server: {
        port: string | undefined;
    };
    db: {
        host: string | undefined;
        port: string | undefined;
        db: string | undefined;
        user: string | undefined;
        pwd: string | undefined;
    };
}

export default Tconfig;
