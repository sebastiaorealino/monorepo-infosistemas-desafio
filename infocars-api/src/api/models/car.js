import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const carSchema = new mongoose.Schema({
  placa: {
    type: String,
  },
  chassi: {
    type: String,
  },
  renavam: {
    type: String,
  },
  modelo: {
    type: String,
  },
  marca: {
    type: String,
  },
  ano: {
    type: Number,
  },
}, { timestamps: true });

carSchema.plugin(mongoosePaginate);

export default mongoose.model('Car', carSchema);
