import Batch from '../models/batch.model';

export function getBatch(req, res) {
    const id = req.params.batch;
    Batch.findOne({id: id}, (err, batch) => {
        res.json(batch);
    });
}

export function getBatches(req, res) {
    Batch.find((err, batches) => {
        res.json(batches);
    });
}

export function saveBatch(req, res, next) {
    let batch = new Batch(req.body);
    batch.save((err) => {
        if (err) return next(err);
        res.json({
            success: true
        });
    })
}
